"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";


interface DashboardLayoutProps {
  children: ReactNode;
}

export interface User {
  name: string;
  email: string;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const usersStr = localStorage.getItem("users");
    const storedUser = usersStr ? (JSON.parse(usersStr) as User) : null;
    if (!storedUser) {
      router.push("/");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex h-screen min-h-screen">

         <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className=" bg-linear-to-r from-slate-50 via-slate-100 to-slate-50 w-full p-5 overflow-auto relative">
     
        
        {/* <TopBar
          user={user}
          open={open}
          setOpen={setOpen}
          setMobileOpen={setMobileOpen}
        /> */}
        {children}
       
      </div>
    </div>
  );
}

export default DashboardLayout;


