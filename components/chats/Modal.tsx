
"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/srevices/user";
import { Conversation, createOrGetDirectConversation } from "@/srevices/chat";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  onClose: () => void;
  onSelectConversation: (conv:Conversation)=> void;
}

const UserPopup = ({ onClose, onSelectConversation }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("users");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserId(user._id || user.id);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      const filtered = data.filter(
        (u: User) => u._id !== userId
      );
      setUsers(filtered);
    };

    if (userId) fetchUsers();
  }, [userId]);

  const handleStartChat = async (selectedUser: User) => {
    const conversation = await createOrGetDirectConversation(
      userId,
      selectedUser._id
    );

    if (conversation) {
      onSelectConversation(conversation);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-96 max-h-[70vh] rounded-2xl shadow-xl p-6 flex flex-col">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleStartChat(user)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPopup;