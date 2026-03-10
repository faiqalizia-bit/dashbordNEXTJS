    //   const markConversationRead = async () => {
    //    if (!conversation || !userId) return;
       
    //    try {
    //      await markMessagesAsRead(conversation._id, userId);
     
    //      // Update local state to mark messages as read
    //      setMessages(prev =>
    //        prev.map(msg =>
    //          msg.status !== "read"
    //            ? { ...msg, status: "read", isRead: true }
    //            : msg
    //        )
    //      );
    //    } catch (err) {
    //      console.error("Mark as read failed", err);
    //    }
    //  };
     
    //  useEffect(() => {
    //    if (!conversation) return;
     
    //    // Call mark as read when the conversation is opened
    //    markConversationRead();
    //  }, [conversation]);
     
     
    const markConversationRead = async () => {
      if (!conversation || !userId) return;
      
      try {
        await markMessagesAsRead(conversation._id, userId);
    
        // Update local state to mark messages as read
        setMessages(prev =>
          prev.map(msg =>
            msg.status !== "read"
              ? { ...msg, status: "read", isRead: true }
              : msg
          )
        );
      } catch (err) {
        console.error("Mark as read failed", err);
      }
    };
     
     <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex">
        {/* left pannel / Threads / chats */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col ">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            {users.map((users, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="min-w-10 min-h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {users.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {users.name.length > 10
                      ? users.name.slice(0, 10) + "..."
                      : users.name}
                  </p>
                  <p className="text-xs text-gray-500 ">
                    {users.Recent.length > 10
                      ? users.Recent.slice(0, 10) + "..."
                      : users.Recent}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{users.time}</span>
              </div>
            ))}
          </div>
        </div>
        {/* {Chat Room l} */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
          <div className="h-20 bg-white dark:bg-gray-800 border-b px-6 flex  items-center gap-4">
            {/* <div className="border p-2 text-xl">
            Messeges
            </div> */}

            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              A
            </div>

            {/* chat header */}
            <div>
              <p className="font-semibold">Amna faheem</p>
              <p className="text-sm ">Last Seen 1/7/26</p>
            </div>
          </div>
         
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-start gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-full  bg-blue-500 flex justify-center  items-center">
                A
              </div>
              <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>who,s there</p>
                <p className="text-right text-xs">12:37</p>
              </div>
              
              </div>
            </div>

            <div className="flex items-end justify-end gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>JO mrzi smj lo</p>
                 <p className="text-right text-xs">12:37</p>
              </div>
              <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                F
              </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-3">
              <div className="flex justify-center items-center gap-2">
                <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                  <p>Gas U!</p>
                  <p className="text-right text-xs">12:38</p>
                </div>
                <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                  F
                </div>
              </div>
            </div>

            <div className="flex items-start  gap-3">
              <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-blue-500">
                  A
                </div>
                <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                  <p>typo hogya?</p>
                  <p className="text-right text-xs">12:40</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>Nhi toh</p>
                <p className="text-right text-xs">12:41</p>
              </div>
              <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                F
              </div>
              </div>
            </div>
            
             <div className="flex items-start gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-full  bg-blue-500 flex justify-center  items-center">
                A
              </div>
              <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>who,s there</p>
                <p className="text-right text-xs">12:37</p>
              </div>
              
              </div>
            </div>

            
            <div className="flex items-end justify-end gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>JO mrzi smj lo</p>
                 <p className="text-right text-xs">12:37</p>
              </div>
              <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                F
              </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-3">
              <div className="flex justify-center items-center gap-2">
                <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                  <p>Gas U!</p>
                  <p className="text-right text-xs">12:38</p>
                </div>
                <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                  F
                </div>
              </div>
            </div>

            <div className="flex items-start  gap-3">
              <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-blue-500">
                  A
                </div>
                <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                  <p>typo hogya?</p>
                  <p className="text-right text-xs">12:40</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-3">
               <div className="flex justify-center items-center gap-2">
              <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                <p>Nhi toh</p>
                <p className="text-right text-xs">12:41</p>
              </div>
              <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                F
              </div>
              </div>
            </div>

          </div>








            {/* Engineered by Faiq ali zia  */}

        {/* left pannel / Threads / chats */}
        {/* <div className="w-80 bg-white dark:bg-gray-800 border-r p-5 flex flex-col ">
        
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            {users.map((users, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="min-w-10 min-h-10 rounded-full bg-[#151f33] text-white flex items-center justify-center font-semibold">
                  {users.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {users.name.length > 10
                      ? users.name.slice(0, 10) + "..."
                      : users.name}
                  </p>
                  <p className="text-xs text-gray-500 ">
                    {users.Recent.length > 10
                      ? users.Recent.slice(0, 10) + "..."
                      : users.Recent}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{users.time}</span>
              </div>
            ))}
          </div>
        </div> */}
         {/* <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col">
              <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>JO mrzi smj lo</p>
                      <p className="text-right text-xs">12:37</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
        
                <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>Gas U!</p>
                      <p className="text-right text-xs">12:38</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
        
                <div className="flex items-start  gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
                      A
                    </div>
                    <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>typo hogya?</p>
                      <p className="text-right text-xs">12:40</p>
                    </div>
                  </div>
                </div>
        
                <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>Nhi toh</p>
                      <p className="text-right text-xs">12:41</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-8 h-8 rounded-full  bg-[#151f33] flex justify-center  items-center">
                      A
                    </div>
                    <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>who,s there</p>
                      <p className="text-right text-xs">12:37</p>
                    </div>
                  </div>
                </div>
        
                <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>JO mrzi smj lo</p>
                      <p className="text-right text-xs">12:37</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
        
                <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>Gas U!</p>
                      <p className="text-right text-xs">12:38</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
        
                <div className="flex items-start  gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
                      A
                    </div>
                    <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>typo hogya?</p>
                      <p className="text-right text-xs">12:40</p>
                    </div>
                  </div>
                </div>
        
                <div className="flex items-end justify-end gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
                      <p>Nhi toh</p>
                      <p className="text-right text-xs">12:41</p>
                    </div>
                    <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
                      F
                    </div>
                  </div>
                </div>
        
              <div className="  h-20 bg-white dark:bg-gray-800 border-t px-6 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                  Send
                </button>
              </div>
         </div>  */}




          {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>JO mrzi smj lo</p>
              <p className="text-right text-xs">12:37</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Gas U!</p>
              <p className="text-right text-xs">12:38</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-start  gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>typo hogya?</p>
              <p className="text-right text-xs">12:40</p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Nhi toh</p>
              <p className="text-right text-xs">12:41</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}
        {/* <div className="flex items-start gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full  bg-[#151f33] flex justify-center  items-center">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>who,s there</p>
              <p className="text-right text-xs">12:37</p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>JO mrzi smj lo</p>
              <p className="text-right text-xs">12:37</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Gas U!</p>
              <p className="text-right text-xs">12:38</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-start  gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center  rounded-full bg-[#151f33]">
              A
            </div>
            <div className="bg-white flex gap-2 justify-between items-center dark:bg-gray-800 px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>typo hogya?</p>
              <p className="text-right text-xs">12:40</p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex items-end justify-end gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-blue-600 flex gap-2 justify-between items-center text-white px-4 py-3 rounded-2xl shadow max-w-xs">
              <p>Nhi toh</p>
              <p className="text-right text-xs">12:41</p>
            </div>
            <div className="w-8 h-8 rounded-full  bg-gray-500 flex justify-center items-center">
              F
            </div>
          </div>
        </div>  */}




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
            
          }, [conversation, userId]);
        
          const handleSend = async () => {
            if (!conversation || !input.trim() || !userId) {
              // setError("Cannot send message");
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
              setInput(messageContent); 
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
                        {new Date(msg.createdAt || new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
                  onKeyPress={handleKeyPress}
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
        
        if (!conversation) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-md max-w-sm w-full">
        
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
          💬
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Conversation Selected
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Choose a user from the sidebar to start chatting instantly.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            // optional: scroll to users list or trigger open users modal
            console.log("Select user clicked");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Select User
        </button>
      </div>
    </div>
  );
}