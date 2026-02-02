"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserNurse, FaPeopleCarry } from "react-icons/fa";
import { MdPersonalInjury, MdApartment, MdSecurity } from "react-icons/md";

const routes = [
  { title: "Dashboard", icon: <RiDashboardFill />, path: "/dashboard" },
  { title: "Doctors", icon: <MdSecurity />, path: "/doctor" },
  { title: "Nurses", icon: <FaUserNurse />, path: "/nurse" },
  { title: "Patients", icon: <MdPersonalInjury />, path: "/patient" },
  { title: "Ward Boys", icon: <FaPeopleCarry />, path: "/wardboys" },
  { title: "Departments", icon: <MdApartment />, path: "/department" },
  { title: "Guards", icon: <MdSecurity />, path: "/guards" },
  { title: "Receptionist", icon: <MdSecurity />, path: "/receptionist" },
];

export default function SidebarRoutes({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {routes.map((item, idx) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={idx}
            href={item.path}
            className={`flex items-center gap-3 p-3 rounded-md transition-all tracking-[1px]
              ${isActive ? "bg-gray-950 text-white" : "hover:text-orange-700"}`}
          >
            <span className="text-lg font-bold">{item.icon}</span>
            {!collapsed && <span>{item.title}</span>}
          </Link>
        );
      })}
    </div>
  );
}
