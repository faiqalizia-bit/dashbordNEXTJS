"use client";

import { connectSocket, getSocket } from "@/lib/socket";
import { FiMoreVertical, FiEdit2, FiTrash2, FiStar, FiCheck } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import {
  getMessages,
  sendMessage,
  Message,
  Conversation,
  updateMessage,
  // markMessagesAsRead,
  // deleteMessageForEveryone,
  // deleteMessageForMe
  deleteMessage,
} from "@/srevices/chat";
import { getUsers } from "@/srevices/user";
import { getConversationName } from "./chat";
import DeletePopup from "./delModal";

// interface DeleteMessageParams {
//   messageId: string;
//   userId: string;
//   deleteType: string;
// }

interface User {
  _id?: string;
  id?: string;
  name: string;
  avatar?: string;
}

interface MessageWithSender extends Message {
  senderName?: string;
  senderAvatar?: string;
  isDeleted?: boolean;
  status?: string;
}

interface Props {
  conversation: Conversation | null;
  onOpenUsers: () => void;
}

const ChatRoom = ({ conversation, onOpenUsers }: Props) => {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<MessageWithSender | null>(null);

  const limit = 20;

  useEffect(() => {
    const userStr = localStorage.getItem("users");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user._id || user.id || "");
        setCurrentUserName(user.name || "");
        const token = localStorage.getItem("token");

        if (token) {
          connectSocket(token);
        }
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
        (users || []).forEach((user: User) => {
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
        const data = await getMessages(conversation._id, 1, limit);

        if (data.length < limit) {
          setHasMore(false);
        }

        const enrichedMessages = data.map((msg: Message) => ({
          ...msg,
          senderName: userMap[msg.senderId]?.name || "Unknown User",
          senderAvatar: userMap[msg.senderId]?.avatar,
        }));

        setMessages(enrichedMessages);
        setPage(1);
        // await markMessagesAsRead(conversation._id, userId);
      } catch  {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    console.log("🚀 ~ fetchMessages ~ fetchMessages:", fetchMessages)

    fetchMessages();
  }, [conversation, userId, userMap]);

  const handleScroll = async () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // When user scrolls near top
    if (container.scrollTop < 10 && hasMore && !loading) {
      const nextPage = page + 1;

      try {
        setMessages((prev) => [...prev]);

        setPage(nextPage);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (page === 1 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, page]);

  useEffect(() => {
    if (!conversation) return;

    const socket = getSocket();

    socket.emit("joinConversation", conversation._id);

    socket.on("receiveMessage", (message) => {
      if (message.conversationId === conversation._id) {
        setMessages((prev) => [...prev, message]);
      }
    });
    

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversation]);

  const handleSend = async () => {
    if (!conversation || !input.trim() || !userId) return;

    const messageContent = input.trim();
    setInput("");

    try {
      const newMessage = await sendMessage({
        conversationId: conversation._id,
        senderId: {
          _id: userId,
          name: currentUserName,
          avatar: userMap[userId]?.avatar,
        },
        type: "text",
        content: messageContent,
      });

      if (!newMessage) return;

      const socket = getSocket();
      socket.emit("conversationUpdated", {
        conversationId: conversation._id,
        lastMessage: newMessage,
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  {
    /* edit msg */
  }
  const handleUpdate = async () => {
    if (!editingMessageId || !editText.trim() || !conversation) return;

    try {
      const updated = await updateMessage(editingMessageId, editText);

      if (!updated) return;

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === editingMessageId ? { ...msg, content: editText } : msg,
        ),
      );

      const socket = getSocket();
      socket.emit("conversationUpdated", {
        conversationId: conversation._id,
        lastMessage: updated,
      });

      setEditingMessageId(null);
      setEditText("");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    const socket = getSocket();

    socket.on("messageEdited", (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg,
        ),
      );
    });

    return () => {
      socket.off("messageEdited");
    };
  }, []);

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  const handleDeleteForMe = async (messageId: string) => {
    if (!userId) return;

    try {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      await deleteMessage(messageId, userId, "me");
    } catch (err) {
      console.error("Delete for me failed", err);
    }
  };

  const handleDeleteForEveryone = async (messageId: string) => {
    if (!userId || !conversation) return;

    try {
      await deleteMessage(messageId, userId, "everyone");

      // Optimistic update → mark as deleted
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, isDeleted: true, content: "" }
            : msg,
        ),
      );

    } catch (err) {
      console.error("Delete for everyone failed", err);
    }
  };

  useEffect(() => {
    const socket = getSocket();

    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isDeleted: true } : msg,
        ),
      );
    });

    
    return () => {
      socket.off("messageDeleted");
    };
  }, []);
  {/* MARK-READ*/}

//  useEffect(() => {
//   const socket = getSocket();

//   socket.on("messagesRead", ({ conversationId }) => {
//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.conversationId === conversationId
//           ? { ...msg, status: "read", isRead: true }
//           : msg
//       )
//     );
//   });

//   return () => {
//     socket.off("messagesRead");
//   };
// }, []);
  
  
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-5 w-full ">
        <div className="flex flex-col justify-center items-center p-8 ">
          <h2 className="text-3xl font-bold  mb-2">Welcome to Chat !</h2>

          <p className=" text-gray-500 w-[70%] text-center mb-6">
            Your conversation panel is ready. Messages and updates will appear
            here.
          </p>

          <button
            onClick={onOpenUsers}
            className="w-auto bg-slate-900 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
          >
            Start Conversation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
          {getConversationName(conversation, userId).charAt(0).toUpperCase()}
        </div>
        <p className="font-semibold text-lg">
          {getConversationName(conversation, userId)}
        </p>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-6 overflow-y-auto space-y-4"
      >
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

        {messages.map((msg) => {
          const isSender = msg.senderId === userId;
          const otherUser = userMap[msg.senderId];

          const initial = (
            (isSender ? currentUserName : otherUser?.name) || "U"
          )
            .charAt(0)
            .toUpperCase();

          return (
            <div
              key={msg._id}
              className={` flex justify-center items-center gap-3 ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold text-sm">
                {initial}
              </div>

              {/* Message Bubble */}
              <div className="relative max-w-[60%]">
                <div
                  className={`p-4 rounded-3xl shadow max-w-xs wrap-break-word ${
                    isSender
                      ? "bg-white rounded-br-md"
                      : "bg-green-200 text-black rounded-bl-md"
                  }`}
                >
                  {/* Sender Name */}
                  <p className="text-xs font-semibold mb-1 opacity-80">
                    {isSender
                      ? currentUserName
                      : otherUser?.name || "Unknown User"}
                  </p>

                  {/* Message Content */}
                  {editingMessageId === msg._id ? (
                    <div className="space-y-2">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-black outline-none"
                        autoFocus
                      />

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleCancelEdit}
                          className="text-xs px-3 py-1 bg-gray-300 rounded-lg"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleUpdate}
                          className="text-xs px-3 py-1 bg-blue-600 text-white rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : msg.isDeleted ? (
                    <p className="italic text-sm opacity-70">
                      This message was deleted
                    </p>
                  ) : (
                    <p>{msg.content}</p>
                  )}

                  <div className="flex items-center justify-end gap-1 text-xs mt-1 opacity-70">
  <span>
    {new Date(msg.createdAt || new Date()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>

 

  {/* DELIVERED */}
  {isSender  &&   (
    <span className="flex text-gray-300">
      <FiCheck className="-mr-2" size={14} />
      <FiCheck size={14} />
    </span>
  )}

  {/* READ */}
  {isSender && msg.status === "read" && (
    <span className="flex text-blue-800">
      <FiCheck className="-mr-1" size={14} />
      <FiCheck size={14} />
    </span>
  )}
</div>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === msg._id ? null : msg._id)
                    }
                    className="absolute top-1 right-0 p-1 text-gray-600 text-xs hover:text-black "
                  >
                    <FiMoreVertical size={16} />
                  </button>

                  {openMenuId === msg._id && (
                    <div className="absolute top-4 right-3 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
                      {isSender && (
                        <button
                          onClick={() => {
                            setEditingMessageId(msg._id);
                            setEditText(msg.content);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          <FiEdit2 size={14} />
                          Edit
                        </button>
                      )}

                      <button className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                        <FiStar size={14} />
                        Star
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMessage(msg);
                          setShowDeletePopup(true);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
          className="bg-[#1a212f] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
      <DeletePopup
        isOpen={showDeletePopup}
        isSender={selectedMessage?.senderId === userId}
        onClose={() => setShowDeletePopup(false)}
        onDeleteForMe={() => {
          if (selectedMessage) {
            handleDeleteForMe(selectedMessage._id);
          }
          setShowDeletePopup(false);
        }}
        onDeleteForEveryone={() => {
          if (selectedMessage) {
            handleDeleteForEveryone(selectedMessage._id);
          }
          setShowDeletePopup(false);
        }}
      />
    </div>
  );
};

export default ChatRoom;
