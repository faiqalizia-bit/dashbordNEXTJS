import CustomModal from "../common/customModal";
import { DeleteModalProps } from "@/types";
function DeleteReceptionist({ onCancel, onDelete }:DeleteModalProps) {
  return (
    <CustomModal title="Confirm Delete" onClose={onCancel} >
      <p className="mb-4 font-semibold uppercase">Are you sure you want to delete?</p>
      <div className="flex justify-center gap-2">
        <button onClick={onCancel}
          className="px-3 py-1  rounded bg-gray-400 text-neutral"
        >Cancel</button>
        <button onClick={onDelete}
          className="px-3 py-1  rounded bg-[#293b69] text-white">
          Delete
        </button>
      </div>
    </CustomModal>
  );
}

export default DeleteReceptionist;