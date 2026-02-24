"use client";

import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
  Message,
  Conversation,
} from "@/srevices/chat";
import { getUsers } from "@/srevices/user";

interface User {
  _id?: string;
  id?: string;
  name: string;
  avatar?: string;
}

interface MessageWithSender extends Message {
  senderName?: string;
  senderAvatar?: string;
}

interface Props {
  conversation: Conversation | null;
}

const ChatRoom = ({ conversation }: Props) => {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userMap, setUserMap] = useState<Record<string, User>>({});

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

  // Fetch all users and create a map for quick lookup
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        const map: Record<string, User> = {};
        (users || []).forEach((user: any) => {
          const id = user._id || user.id;
          if (id) {
            map[id] = {
              _id: user._id || user.id,
              id: user.id,
              name: user.name || "Unknown User",
              avatar: user.avatar,
            };
          }
        });
        setUserMap(map);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!conversation || !userId) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMessages(conversation._id);
        // Enrich messages with sender information
        const enrichedMessages = data.map((msg: Message) => ({
          ...msg,
          senderName: userMap[msg.senderId]?.name || "Unknown User",
          senderAvatar: userMap[msg.senderId]?.avatar,
        }));
        setMessages(enrichedMessages);
      } catch (err) {
        setError("Failed to load messages");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
  }, [conversation, userId, userMap]);

  const handleSend = async () => {
    if (!conversation || !input.trim() || !userId) {
      // setError("Cannot send message");
      return;
    }

    const messageContent = input.trim();
    setInput("");
    setError(null);

    try {
      const currentUser = userMap[userId];
      const newMessage = await sendMessage({
        conversationId: conversation._id,
        senderId: {
          _id: userId,
          name: currentUser?.name || "You",
          avatar: currentUser?.avatar,
        },
        type: "text",
        content: messageContent,
      });

      if (newMessage) {
        // Add sender details to the message
        const enrichedMessage: MessageWithSender = {
          ...newMessage,
          senderName: currentUser?.name || "You",
          senderAvatar: currentUser?.avatar,
        };
        setMessages((prev) => [...prev, enrichedMessage]);
      } else {
        setError("Failed to send message");
      }
    } catch (err) {
      setError("Error sending message");
      setInput(messageContent); 
      console.error("Send message error:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }


const getConversationName = () => {
  if (!conversation) return "";

  if (conversation.type === "group") return conversation.name || "Group Chat";


  const otherUser = conversation.participants.find(
    (p: any) => p._id !== userId
  );
  return otherUser?.name || "Direct Chat";
};

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
    {getConversationName().charAt(0).toUpperCase()}
  </div>
  <p className="font-semibold text-lg">{getConversationName()}</p>
</div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && messages.length === 0 && (
          <div className="text-center text-gray-500">Loading messages...</div>
        )}

        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-500">No messages yet</div>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex gap-3 ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
      
            {msg.senderId !== userId && (
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold text-sm">
                  {msg.senderName?.charAt(0).toUpperCase() || "?"}
                </div>
              </div>
            )}
            
            <div className={`flex flex-col items-center ${msg.senderId === userId ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl shadow max-w-xs wrap-break-word ${
                  msg.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-green-200 text-black"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.createdAt || new Date()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="h-20 bg-white dark:bg-gray-800 border-t px-6 flex items-center gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="Type a message... (Press Enter to send)"
          disabled={!userId}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!userId || !input.trim()}
          className="bg-[#151f33] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;




