import API from "@/api";


export interface Conversation {
  _id: string;
  type: "direct" | "group";
  participants: string[];
  lastActivity: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  type: "text" | "image" | "file" | "system";
  content: string;
  createdAt?: string;
  timestamp?: string;
}

export const createOrGetDirectConversation = async (
  userId1: string,
  userId2: string
): Promise<Conversation | null> => {
  try {
    const res = await API.post("/chat/conversation", {
      userId1,
      userId2,
    });

    return res.data;
  } catch (error) {
    console.error("Conversation Error:", error);
    throw error;
  }
};

export const getUserConversations = async (
  userId: string
): Promise<Conversation[]> => {
  try {
    const res = await API.get(`/chat/conversations/${userId}`);
    return res.data || [];
  } catch (error) {
    console.error("Fetch Conversations Error:", error);
    throw error;
  }
};


export const getMessages = async (
  conversationId: string
): Promise<Message[]> => {
  try {
    const res = await API.get(`/chat/messages/${conversationId}`);
    return res.data || [];
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    throw error;
  }
};

// Send Message
export const sendMessage = async (data: {
  conversationId: string;
  senderId: string;
  type?: "text" | "image" | "file" | "system";
  content: string;
  replyTo?: string | null;
}): Promise<Message | null> => {
  try {
    const res = await API.post("/chat/message", data);
    return res.data;
  } catch (error) {
    console.error("Send Message Error:", error);
    throw error;
  }
};

// Mark as Read
// export const markAsRead = async (
//   messageId: string,
//   userId: string
// ): Promise<boolean> => {
//   try {
//     await api.post("/chat/read", {
//       messageId,
//       userId,
//     });

//     return true;
//   } catch (error) {
//     console.error("Mark Read Error:", error);
//     return false;
//   }
// };