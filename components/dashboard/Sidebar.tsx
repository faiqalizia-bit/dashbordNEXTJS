 import { FaHospital } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SidebarRoutes from "./SidebarRotes";
import { FiLogOut } from "react-icons/fi";


type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void; 
};
function Sidebar({ collapsed, setCollapsed, onLogout }:SidebarProps) {
  return (
    <div
      className={`bg-[#f3f4f6] flex flex-col transition-all pt-10 duration-300
      ${collapsed ? "w-17"
         : "w-[17%]"} p-4`}
    >
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h1 className="text-blue-950 font-bold text-2xl flex items-center gap-2">
            <FaHospital />   Care Health
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xl m-auto"
        >
          {collapsed ? <IoChevronForward /> : <IoChevronBack />}
        </button>
      </div>

      <SidebarRoutes collapsed={collapsed} />

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 p-3 hover:text-orange-700 rounded-md"
      >
        <FiLogOut />
        {/* Logout */}
        {!collapsed && "Logout"}
      </button>
    </div>
  );
}

export default Sidebar;