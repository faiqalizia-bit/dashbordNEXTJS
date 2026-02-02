"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
 interface DashboardLayoutProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
}

function DashboardLayout({ children }:DashboardLayoutProps) {
    const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)
  



  const storedUser = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    if (!storedUser) {
      router.push("/")
    }
    else {
      setUser(storedUser);
    }
  }, [])
  if (!storedUser) {
    return
  }
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
      />

      <div className="w-full p-5 overflow-auto relative">
        <TopBar user={user} open={open} setOpen={setOpen} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;