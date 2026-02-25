// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";

// const SocketContext = createContext<Socket | null>(null);

// export const SocketProvider = ({ children }: { children: ReactNode }) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     socketRef.current = io("http://localhost:5000", {
//       auth: {
//         token,
//       },
//       transports: ["websocket"], // optional but recommended
//     });

//     setSocket(socketRef.current);

//     socketRef.current.on("connect", () => {
//       console.log("✅ Socket Connected:", socketRef.current?.id);
//     });

//     socketRef.current.on("disconnect", () => {
//       console.log("❌ Socket Disconnected");
//     });

//     // Cleanup on unmount
//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   return useContext(SocketContext);
// };