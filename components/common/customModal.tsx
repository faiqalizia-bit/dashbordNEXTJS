import { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

interface CustomModalProps {
  editId?: string | number | null;
  title: string;
  editTitle?: string;
  onClose: () => void;
  children: ReactNode;
}

function CustomModal({
  editId,
  title,
  editTitle,
  onClose,
  children,
}: CustomModalProps) {
  return (
    <div className="fixed z-59 inset-0 bg-black opacity-90 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-88 ">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">
            {editId ? editTitle : title}
          </h2>

          <button
            onClick={onClose}
            className="text-primary font-semibold text-lg hover:text-white p-2 rounded-md hover:bg-red-500"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="text-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
