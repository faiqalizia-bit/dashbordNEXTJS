import CustomModal from "../common/customModal";
import { SubmitEvent, FormChangeEvent } from "@/types";
interface NurseForm {
  name: string;
  email: string;
  status: string;
}

interface CreateProps {
  formData: NurseForm;
  editId: string | null;
  onClose: () => void;
  onSubmit: (e: SubmitEvent) => void;
  handleChange: (e: FormChangeEvent) => void;
}
function CreateNurse({
  formData,
  handleChange,
  editId,
  onClose,
  onSubmit,
}:CreateProps) {
  return (
    <div>
      <CustomModal
        title="Add Nurse"
        editTitle="Edit Nurse"
        editId={editId}
        onClose={onClose}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border p-2 rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="" className="dark:bg-black">Select Status</option>
            <option value="Active" className="dark:bg-black">Active</option>
            <option value="Inactive" className="dark:bg-black">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button className="bg-(--button) text-(--buttontext) px-4 py-1 rounded">
              {editId ? "Save" : "Add"}
            </button>
          </div>
        </form>

      </CustomModal>
    </div>
  );
}

export default CreateNurse;