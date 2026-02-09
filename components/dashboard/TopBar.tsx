import { FaUserCircle } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { User } from "./Layout";

type prop = {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TopBar({ user, open, setOpen, setMobileOpen }: prop) {
  return (
     <div className="fl;ex justify-between items-center border-b-2 h-[30px] relative mb-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden  rounded-sm text-xs bg-slate-900 text-white py-1 px-2 mb-2"
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="absolute top-0 right-6 z-50">
          <FaUserCircle
            size={25}
            className="cursor-pointer text-gray-700 hover:text-primary"
            onClick={() => setOpen(!open)}
          />

          {open && <UserMenu user={user} />}
        </div>
      </div>
    </div>
  );
}

export default TopBar;


// <div className="flex justify-between items-center border-b-2 h-[30px] relative mb-4">
//       <div className="flex justify-between items-center">
//         <button
//           onClick={() => setMobileOpen(true)}
//           className=" lg:hidden rounded-sm text-white px-2 py-1 mb-1"
//         >
//           ☰
//         </button>

//         <div className="absolute top-0 right-6 z-50">
//           <FaUserCircle
//             size={25}
//             className="cursor-pointer text-gray-700 hover:text-primary"
//             onClick={() => setOpen(!open)}
//           />

//           {open && <UserMenu user={user} />}
//         </div>
//       </div>
//     </div>
