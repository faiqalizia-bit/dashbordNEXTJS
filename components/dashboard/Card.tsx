import { ReactNode } from "react";
import { useRouter } from "next/navigation";
interface CardProps {
  icon?: ReactNode;
  title: string;
  value?: string | number;
  children?: ReactNode;
  recentCard?: boolean;
  idx?: number;
  activeCount?: number;
  inActiveCount?: number;
  className?: string;
  viewCard?: boolean;
  viewAllLink?: string;
}

function Card({
  icon,
  title,
  value,
  children,
  recentCard = false,
  viewCard = false,
  idx,
  activeCount,
  inActiveCount,
  className = "",
  viewAllLink = "/",
}: CardProps) {
  const router = useRouter();

  const handleViewAll = () => {
    router.push(viewAllLink);
  };
  return (
    <div
      className={`w-full bg-white p-4 sm:p-5 lg:p-6 rounded shadow ${className}`}
      key={idx}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-6">
          {!recentCard && (
            <span
              style={{ fontSize: "12px" }}
              className="text-sm sm:text-base lg:text-lg bg-[#293b69] rounded-full p-2 text-white"
            >
              {icon}{" "}
            </span>
          )}
          <h3 className="text-base sm:text-lg lg:text-xl font-bold">{title}</h3>
        </div>
        {!recentCard && (
          <p className="flex justify-center items-center text-2xl sm:text-3xl lg:text-4xl font-bold   ">
            {value}
          </p>
        )}

        {viewCard && (
          <button
            onClick={handleViewAll}
            className="text-gray-600 hover:underline"
          >
            View All
          </button>
        )}
      </div>
      {!recentCard && (
        <div className="flex gap-2.5 items-center">
          <p className="text-[11px] sm:text-xs lg:text-sm">
            <span className="inline-block rounded-full bg-green-500 size-2.5 mr-1"></span>
            Active: <span className="font-bold">{activeCount}</span>{" "}
          </p>
          <p className="text-[12px]">
            <span className="inline-block rounded-full bg-red-500 size-2.5 mr-1"></span>
            Inactive: <span className="font-bold">{inActiveCount} </span>{" "}
          </p>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;


// "use client";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";


// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export interface User {
//   name: string;
//   email: string;
// }

// function DashboardLayout({ children }: DashboardLayoutProps) {
//   const router = useRouter();
//   const [collapsed, setCollapsed] = useState<boolean>(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const usersStr = localStorage.getItem("users");
//     const storedUser = usersStr ? (JSON.parse(usersStr) as User) : null;
//     if (!storedUser) {
//       router.push("/");
//     } else {
//       setUser(storedUser);
//     }
//   }, [router]);

//   // Lock body scroll when mobile sidebar is open
//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   if (!user) {
//     return null;
//   }

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/");
//   };

//   return (
//     <div className="flex h-screen min-h-screen">

//          <Sidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         onLogout={handleLogout}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       <div className=" bg-linear-to-r from-slate-50 via-slate-100 to-slate-50 w-full p-5 overflow-auto relative">
     
        
//         <TopBar
//           user={user}
//           open={open}
//           setOpen={setOpen}
//           setMobileOpen={setMobileOpen}
//         />
//         {children}
       
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;


