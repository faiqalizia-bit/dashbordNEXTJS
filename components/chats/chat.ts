import { Conversation } from "@/srevices/chat";


export const getInitial = ( name?: string) => {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
};


export const getConversationName = (
  conv: Conversation,
  userId: string
) => {
  if (!conv?.participants?.length) return "Chat";

  const otherUser = conv.participants.find(
    (p) => p._id !== userId
  );

  return otherUser?.name  || "Direct Chat";
};


export const formatTime = (date?: string) => {
  if (!date) return "";

  const messageDate = new Date(date);
  const now = new Date();

  const isToday =
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return messageDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  });
};


  

 