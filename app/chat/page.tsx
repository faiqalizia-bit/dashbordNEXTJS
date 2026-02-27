"use client";
import UserPopup from "@/components/chats/Modal";
import {  useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import Thread from "@/components/chats/Thread";
import ChatRoom from "@/components/chats/ChatRoom";
import { Conversation } from "@/srevices/chat";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
      const [showUserPopup, setShowUserPopup] = useState(false);

  return (
    <DashboardLayout>
      <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex">
        <Thread onSelectConversation={setSelectedConversation} />
        <ChatRoom conversation={selectedConversation} onOpenUsers={() => setShowUserPopup(true)}/>

        {showUserPopup && (
          <UserPopup
            onClose={() => setShowUserPopup(false)}
            onSelectConversation={(conv) => {
              setSelectedConversation(conv);
              setShowUserPopup(false);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

