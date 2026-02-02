 import { FaUserCircle } from "react-icons/fa";
import UserMenu from "./UserMenu";
type prop = {user: boolean, open:boolean; setOpen:React.Dispatch<React.SetStateAction<null>>}

function TopBar({ user, open, setOpen }:prop) {
  return (
    <div className="border-b-2 h-[30px] relative mb-4">
      <div className="absolute top-0 right-6 z-50">
        <FaUserCircle
          size={25}
          className="cursor-pointer text-gray-700 hover:text-primary"
          onClick={() => setOpen(!open)}
        />

        {open && <UserMenu user={user} />}
      </div>
    </div>
  );
}

export default TopBar;