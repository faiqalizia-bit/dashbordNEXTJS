"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import Thread from "@/components/chats/Thread";
import ChatRoom from "@/components/chats/ChatRoom";
import { Conversation } from "@/srevices/chat";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <DashboardLayout>
      <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex">
        <Thread onSelectConversation={setSelectedConversation} />
        <ChatRoom conversation={selectedConversation} />
      </div>
    </DashboardLayout>
  );
}

// "use client";

// import ChatRoom from "@/components/chats/ChatRoom";
// import Thread from "@/components/chats/Thread";
// import DashboardLayout from "@/components/dashboard/Layout";

// export default function ChatPage() {
//   return (
//     <DashboardLayout>
//       <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex">

//         <Thread />
//         <ChatRoom />


//       </div>
//     </DashboardLayout>
//   );
// }
