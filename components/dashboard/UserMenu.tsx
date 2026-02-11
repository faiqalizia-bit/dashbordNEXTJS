interface User {
  user: {
    name: string;
    email: string;
  };
}
function UserMenu({ user }:User) {
  return (
    <div className="absolute right-0 mt-2 w-40 z-20 bg-white shadow-lg rounded-md border">
      <ul className="text-sm">
        <li className="px-4 py-2 hover:text-primary">{user.name}</li>
        <li className="px-4 py-2 hover:text-primary">{user.email}</li>
      </ul>
    </div>
  );
}

export default UserMenu;


// import { FaHospital } from "react-icons/fa";
// import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
// import SidebarRoutes from "./SidebarRotes";
// import { FiLogOut } from "react-icons/fi";

// type SidebarProps = {
//   collapsed: boolean;
//   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
//   onLogout: () => void;
//   mobileOpen?: boolean;
//   setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function Sidebar({
//   collapsed,
//   setCollapsed,
//   onLogout,
//   mobileOpen = false,
//   setMobileOpen,
// }: SidebarProps) {
//   return (
//     <>
//       {/* Backdrop on mobile */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setMobileOpen && setMobileOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`flex flex-col fixed top-0 bottom-0 left-0 h-screen  transform transition-transform duration-300
//           bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl
//           ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
//           lg:translate-x-0 md:translate-x-0 lg:static md:static lg:h-screen md:h:screen  ${collapsed ? "lg:w-20 md:w-15" : "lg:w-65 md:w- "}`}
//       >
//         <div className="flex items-center justify-between px-4 py-5 border-b-2 border-white/10">
//           {!collapsed && (
//             <h1 className="text-xl font-bold flex items-center gap-2 tracking-wide">
//               <FaHospital />
//               <span>Care Health</span>
//             </h1>
//           )}

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="p-2 rounded-lg hover:bg-white/10 transition hidden md:inline-flex "
//               aria-label="Toggle collapse"
//             >
//               {!collapsed ? <IoChevronForward /> : <IoChevronBack />}
//             </button>

//             <button
//               onClick={() => setMobileOpen && setMobileOpen(false)}
//               className="p-2 rounded-lg hover:bg-white/10 transition md:hidden"
//               aria-label="Close sidebar"
//             >
//               <IoClose />
//             </button>
//           </div>
//         </div>

//         <div className="p-4">
//           <SidebarRoutes collapsed={collapsed} onNavigate={() => setMobileOpen && setMobileOpen(false)} />
//         </div>

//         <button
//           onClick={onLogout}
//           className="mt-auto flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
//         >
//           <FiLogOut size={18} />
//           {!collapsed && "Logout"}
//         </button>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;
