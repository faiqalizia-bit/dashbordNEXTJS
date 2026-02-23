"use client";

import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
  Message,
  Conversation,
} from "@/srevices/chat";

interface Props {
  conversation: Conversation | null;
}

const ChatRoom = ({ conversation }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

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
    if (!conversation || !userId) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMessages(conversation._id);
        setMessages(data);
      } catch (err) {
        setError("Failed to load messages");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Auto-refresh messages every 3 seconds (polling)
    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, [conversation, userId]);

  const handleSend = async () => {
    if (!conversation || !input.trim() || !userId) {
      setError("Cannot send message");
      return;
    }

    const messageContent = input.trim();
    setInput("");
    setError(null);

    try {
      const newMessage = await sendMessage({
        conversationId: conversation._id,
        senderId: userId,
        content: messageContent,
        type: "text",
      });

      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        setError("Failed to send message");
      }
    } catch (err) {
      setError("Error sending message");
      setInput(messageContent); // Restore input on error
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
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl shadow max-w-xs wrap-break-word ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-green-200 text-black"
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt || new Date()).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="h-20 bg-white dark:bg-gray-800 border-t px-6 flex items-center gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyPress={handleKeyPress}
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



// import { dummyMessages } from "@/static-data/dummyMessages";

// const ChatRoom = () => {

//   return (
//     <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
//       {/* chat header */}
//       <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex pb-3  items-center gap-4">
//         <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
//           A
//         </div>
//         <div>
//           <p className="font-semibold">Amna faheem</p>
//           <p className="text-[10px] pb-1">Last Seen 1/7/26</p>
//         </div>
//       </div>

//       {/* chating */}
//       <div className="flex flex-col  p-6 space-y-6 overflow-y-auto">
//         {dummyMessages.map((item, idx) => (
//           <div
//             className={`flex ${item.userType === "receiver" ? "justify-start" : "justify-end"}`}
//             key={idx}
//           >
//             <div className="flex items-center gap-2 max-w-[70%]">
//               <div className="min-w-8 text-sm min-h-8 rounded-full  bg-[#151f33] text-white flex justify-center  items-center">
//                 {item.name}
//               </div>

//               {/* Todo need to collaps over flow content but visible  */}
//               <div
//                 className={` ${item.userType === "receiver" ? "bg-green-200" : "bg-white"} overflow-hidden  gap-2 dark:bg-gray-800 px-4 py-3 rounded-2xl  break-words
//     whitespace-pre-wrap shadow max-w-xs`}
//               >
//                 <p>{item.message}</p>
//                 <p className="text-right text-xs">{item.time}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

      

//       {/* Type Section / Input */}
//       <div className="  h-20 bg-white dark:bg-gray-800 border-t px-6 flex items-center gap-4">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl outline-none"
//         />
//         <button className="bg-[#151f33] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
