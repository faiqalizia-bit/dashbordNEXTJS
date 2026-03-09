import API from "@/api";


export interface Conversation {
  name:string,
  _id: string;
  // type: "direct" | "group";
  participants:  {
  _id: string;
  name: string;
  avatar?: string;
}[];
isDeleted:boolean;
  lastActivity: string;
  lastMessage?: {
    text: string;
    sender: string;
    createdAt: string;
     isRead?:boolean
  };
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
  conversationId: string,page: number,
  limit: number,
): Promise<Message[]> => {
  try {
    const res = await API.get(`/chat/messages/${conversationId}?page=${page}&limit=${limit}`);
    return res.data || [];
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    throw error;
  }
};

// Send Message
export const sendMessage = async (data: {
  conversationId: string;
   senderId: {
    _id: string;
    name: string;
    avatar?: string;
  };
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

export const updateMessage = async (
  messageId: string,
  content: string
): Promise<Message | null> => {
  try {
    const res = await API.put(`/chat/messages/${messageId}`, {
      content,
    });

    return res.data;
  } catch (error) {
    console.error("Update Message Error:", error);
    throw error;
  }
};


export const deleteMessage = async (
  messageId: string,
  userId: string,
  deleteType: string
): Promise<Message | null> => {
  const res = await API.delete(`/chat/messages/${messageId}`, {
    data: {
      userId,
      deleteType,
    },
  });
  return res.data;
};


// export const markMessagesAsRead = async (
//   conversationId: string,
//   userId: string
// ) => {
//   try {
//     await API.put(`/chat/messages/read/${conversationId}`, {
//       userId,
//     });
//   } catch (error) {
//     console.error("Mark read error:", error);
//   }
// };
