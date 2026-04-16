import UserMenu from "./UserMenu";
import { User } from "./Layout";
import ThemeSwitch from "../common/maintheme";

type prop = {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TopBar({ user, open, setOpen, setMobileOpen }: prop) {
  return (
    <div className="fl;ex justify-between items-center border-b-2 h-7.5 relative mb-4">
      <div className="flex justify-between items-center md:justify-evenly lg:justify-start">
        <button
          onClick={() => setMobileOpen(true)}
          className=" md:hidden  rounded-sm text-xs bg-slate-900 text-white py-1 px-2 mb-2"
          aria-label="Open sidebar"
        >
          ☰
        </button>

         <div className="absolute top-0 right-6  ">
          <div className="absolute top-0 right-6  flex items-center gap-4 mr-3">
          <ThemeSwitch/>
          </div>

         

          <div>
          <div
            className="cursor-pointer bg-gray-700 w-6 h-6 rounded-full text-white flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          

          </div>

          {open && <UserMenu user={user} />}
        </div>

        
      </div>
      
    </div>
  );
}

export default TopBar;
