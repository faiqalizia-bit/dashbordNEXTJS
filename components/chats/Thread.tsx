"use client";
import { getSocket, connectSocket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  getUserConversations,
  createOrGetDirectConversation,
  Conversation,
} from "@/srevices/chat";
import { getConversationName, getInitial } from "./chat";
import { getUsers } from "@/srevices/user";

interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
}

interface Props {
  onSelectConversation: (conv: Conversation) => void;
}

const Thread = ({ onSelectConversation }: Props) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [creatingChat, setCreatingChat] = useState<string | null>(null);


  useEffect(() => {
    const userStr = localStorage.getItem("users");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user._id || user.id || "");
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);
      
      //  fetch Cnvesations
  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserConversations(userId);
        setConversations(data);
      } catch (err) {
        setError("Failed to load conversations");
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

  }, [userId]);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  connectSocket(token);
}, []);
                  // thread update on starting new conversation
  useEffect(() => {
  const socket = getSocket();

  socket.on("newConversation", (conversation) => {
    setConversations((prev) => {
      const exists = prev.find(c => c._id === conversation._id);
      if (exists) return prev;
      return [conversation, ...prev];
    });
  });

  return () => {
    socket.off("newConversation");
  };
}, []);

  useEffect(() => {
  const socket = getSocket();

  socket.on("conversationUpdated", ({ conversationId, lastMessage }) => {
    setConversations((prev) => {
      const updated = prev.map((conv) =>
        conv._id === conversationId
          ? {
              ...conv,
              lastMessage,
              lastActivity: lastMessage.createdAt ,
            }
          : conv
      );

      return updated.sort(
        (a, b) =>
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime()
      );
    });
  });
  

  return () => {
    socket.off("conversationUpdated");
  };
}, []);

    
    //  get existing users
  useEffect(() => {
    if (searchTerm.length === 0) return;

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const filtered = (data || []).filter(
          (user: User) => (user._id || user.id) !== userId
        );
        setUsers(filtered);
      } catch {
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, [searchTerm, userId]);
           

  const handleStartChat = async (selectedUser: User) => {
    if (!userId || creatingChat === selectedUser._id) return;

    setCreatingChat(selectedUser._id);

    try {
      const conversation = await createOrGetDirectConversation(
        userId,
        selectedUser._id || selectedUser.id || ""
      );

      if (conversation) {
        setConversations((prev) => {
          const exists = prev.find((c) => c._id === conversation._id);
          if (exists) return prev;
          return [conversation, ...prev];
        });

        onSelectConversation(conversation);
        setSearchTerm(""); // clear search like WhatsApp
      }
    } catch {
      setError("Error starting conversation");
    } finally {
      setCreatingChat(null);
    }
  };




   const filteredConversations = conversations
  .filter((conv) => conv.lastMessage) 
  .filter((conv) => {
    const name = getConversationName(conv, userId);
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });


//  Get userIds from conversations that already have messages
const existingUserIds = conversations
  .filter((conv) => conv.lastMessage) 
  .map((c) =>
    c.participants.find((p) => p._id !== userId)?._id
  )
  .filter(Boolean);

//  Filter users ( when searching)
const filteredUsers =
  searchTerm.length > 0
    ? users.filter(
        (user) =>
          !existingUserIds.includes(user._id) && 
          (user.name || user.email)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];


  return (
      <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Chats</h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search chats or users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-3">{error}</div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto">

        {searchTerm.length > 0 && loading && (
  <div className="text-center text-gray-400 py-4 animate-pulse">
    Searching users...
  </div>
)}

        {/* Conversations */}
        {filteredConversations.map((conv) => {
          const conversationName = getConversationName(conv, userId);

          return (
            <div
              key={conv._id}
              onClick={() => onSelectConversation(conv)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold shrink-0">
                {getInitial(conversationName)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {conversationName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {conv.lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}

        {/* Users (only when searching) */}
        {searchTerm.length > 0 && filteredUsers.length > 0 && (
          <>
            <p className="text-xs text-gray-400 px-2 mt-4">
              Start new chat
            </p>

            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleStartChat(user)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center font-semibold shrink-0">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>

  );
};

export default Thread;





