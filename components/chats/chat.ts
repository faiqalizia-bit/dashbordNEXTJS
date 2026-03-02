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


  

 