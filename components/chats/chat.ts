import { Conversation } from "@/srevices/chat";

export const getInitial = (name?: string) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

export const getConversationName = (conv: Conversation, userId: string) => {
  if (conv.type === "group") return conv.name || "Group Chat";

  const otherUser = conv.participants.find(
    (p: any) => p._id !== userId
  );

  return otherUser?.name || "Direct Chat";
};

  

 