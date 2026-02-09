"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { BsReception4 } from "react-icons/bs";
import { FaUserNurse, FaPeopleCarry } from "react-icons/fa";
import { MdPersonalInjury, MdSecurity } from "react-icons/md";

const routes = [
	{ title: "Dashboard", icon: <RiDashboardFill />, path: "/dashboard" },
	{ title: "Doctors", icon: <FaUserDoctor />, path: "/doctor" },
	{ title: "Nurses", icon: <FaUserNurse />, path: "/nurse" },
	{ title: "Patients", icon: <MdPersonalInjury />, path: "/patient" },
	{ title: "Ward Boys", icon: <FaPeopleCarry />, path: "/wardboys" },
	{ title: "Guards", icon: <MdSecurity />, path: "/guards" },
	{ title: "Receptionist", icon: <BsReception4 />, path: "/receptionist" },
];

export default function SidebarRoutes({
	collapsed,
	onNavigate,
}: {
	collapsed: boolean;
	onNavigate?: () => void;
}) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-2">
			{routes.map((item, idx) => {
				const isActive = pathname === item.path;
				return (
					<Link
						key={idx}
						href={item.path}
						onClick={() => onNavigate && onNavigate()}
						className={` flex items-center gap-3 p-3 rounded-md transition-all tracking-[1px]
              ${
								isActive
									? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
									: "text-slate-300 hover:bg-white/10 hover:text-white"
							}`}
					>
						<span className="text-lg font-bold">{item.icon}</span>
						{!collapsed && <span>{item.title}</span>}
					</Link>
				);
			})}
		</div>
	);
}
