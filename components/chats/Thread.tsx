"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  getUserConversations,
  createOrGetDirectConversation,
  Conversation,
} from "@/srevices/chat";
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
  const [activeTab, setActiveTab] = useState<"conversations" | "users">("conversations");
  const [creatingChat, setCreatingChat] = useState<string | null>(null);

  // Get logged-in user from localStorage
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

    // Auto-refresh conversations every 5 seconds
    const interval = setInterval(fetchConversations, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      // Filter out current user
      const filtered = (data || []).filter(
        (user: User) => (user._id || user.id) !== userId
      );
      setUsers(filtered);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, userId]);

  const handleStartChat = async (selectedUser: User) => {
    if (!userId || creatingChat === selectedUser._id) return;

    setCreatingChat(selectedUser._id);
    try {
      const conversation = await createOrGetDirectConversation(
        userId,
        selectedUser._id || selectedUser.id || ""
      );

      if (conversation) {
        // Refresh conversations
        const convs = await getUserConversations(userId);
        setConversations(convs);
        //deselect user and go back to conversations
        setActiveTab("conversations");
        onSelectConversation(conversation);
      } else {
        setError("Failed to start conversation");
      }
    } catch (err) {
      setError("Error starting conversation");
      console.error("Error creating conversation:", err);
    } finally {
      setCreatingChat(null);
    }
  };

  const getInitial = (name?: string) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

const getConversationName = (conv: Conversation) => {
  if (conv.type === "group") return conv.name || "Group Chat";

  const otherUser = conv.participants.find(
    (p: any) => p._id !== userId
  );

  return otherUser?.name || "Direct Chat";
};

  const filteredConversations = conversations.filter((conv) =>
    conv.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    (user.name || user.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Chats</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab("conversations")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
            activeTab === "conversations"
              ? "border-[#151f33] text-[#151f33]"
              : "border-transparent text-gray-500"
          }`}
        >
          Conversations
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
            activeTab === "users"
              ? "border-[#151f33] text-[#151f33]"
              : "border-transparent text-gray-500"
          }`}
        >
          Users
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={activeTab === "conversations" ? "Search conversations..." : "Search users..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && activeTab === "conversations" && (
        <div className="text-center text-gray-500 py-8">Loading conversations...</div>
      )}

      {/* Conversations Tab */}
      {activeTab === "conversations" && (
        <div className="flex flex-col gap-4 overflow-y-auto">
          {filteredConversations.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-8">
              {searchTerm ? "No conversations found" : "No conversations yet"}
            </div>
          )}

         {filteredConversations.map((conv) => {
  const lastActivityDate = new Date(conv.lastActivity);
  const timeStr = lastActivityDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const conversationName = getConversationName(conv);

  return (
    <div
      key={conv._id}
      onClick={() => onSelectConversation(conv)}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold shrink-0">
        {getInitial(conversationName)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">
          {conversationName}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {conv.type === "group"
            ? `${conv.participants.length} members`
            : "Direct Message"}
        </p>
        <p className="text-xs text-gray-400">{timeStr}</p>
      </div>
    </div>
  );
})}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="flex flex-col gap-4 overflow-y-auto">
          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              {searchTerm ? "No users found" : "No users available"}
            </div>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold shrink-0">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name || user.email}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>

              <button
                onClick={() => handleStartChat(user)}
                disabled={creatingChat === user._id}
                className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className={`w-4 h-4 ${creatingChat === user._id ? "text-gray-400" : "text-[#151f33]"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thread;





// import { threads } from "@/static-data/thread";
// import { Search } from "lucide-react";

// const Thread = () => {
//   return (
//     <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col ">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-xl font-semibold">Conversations</h2>
//       </div>
//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
//         />
//       </div>

//       <div className="flex flex-col gap-4 overflow-y-auto">
//         {threads.map((users, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
//           >
//             <div className="min-w-10 min-h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
//               {users.name.charAt(0)}
//             </div>
//             <div className="flex-1">
//               <p className="font-medium text-sm">
//                 {users.name.length > 10
//                   ? users.name.slice(0, 10) + "..."
//                   : users.name}
//               </p>
//               <p className="text-xs text-gray-500 ">
//                 {users.Recent.length > 10
//                   ? users.Recent.slice(0, 10) + "..."
//                   : users.Recent}
//               </p>
//             </div>
//             <span className="text-xs text-gray-400">{users.time}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Thread;
