"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState, useCallback, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import usePagination from "@/components/common/usePagination";
import StaticTable from "@/components/common/table";
import { useFormModal } from "@/components/common/useFormModal";
import Pagination from "@/components/common/Pagination";
import {
  createWardBoy,
  updateWardBoy,
  deleteWardBoy,
  getWardBoys,
} from "@/srevices/wardboy";
import { WardBoy, WardBoyType } from "@/components/wardboy/type";
import { wardBoyColumns } from "@/components/common/tablecolumn";
import WardFormModal from "@/components/wardboy/create";
import DeleteWardModal from "@/components/wardboy/delete";

interface WardsResponse {
  wardBoys: WardBoy[];
  totalPages: number;
}

function Wardboy() {
  const [wardBoys, setWardBoys] = useState<WardBoy[]>([]);
  const [search, setSearch] = useState<string>("");
  const [deleted, setDeleted] = useState<string | null>(null);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1);
  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(WardBoyType);

  const fetchWardBoys = useCallback(
    async (pageNumber = page) => {
      try {
        const res = await getWardBoys(pageNumber, 10);
        setWardBoys(res.data.wardBoys);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    },
    [page, setTotalPages],
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await getWardBoys(page, 10);
        const data: WardsResponse = res.data;
        setWardBoys(data.wardBoys);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   const payload = { ...(formData as unknown as Record<string, unknown>) } as Record<string, unknown>;
       if (payload._id === "" || payload._id == null) delete payload._id;
   
       try {
         console.log("Creating/updating doctor with payload:", payload);
   
         if (editId) {
           await updateWardBoy(editId as string, payload);
         } else {
           await createWardBoy(payload);
         }
   
         fetchWardBoys(page);
         close();
       } catch (err: unknown) {
         console.error("Failed to create/update doctor:", err);
         // show user-friendly error
         let message = "Failed to save doctor";
         if (err && typeof err === "object") {
           const e = err as { response?: { data?: { message?: string } }; message?: string };
           message = e.response?.data?.message || e.message || message;
         }
         alert(message);
       }
     };

  const handleDelete = async (): Promise<void> => {
    if (!deleted) return;
    await deleteWardBoy(deleted);
    fetchWardBoys(page);
    setDeleted(null);
  };

  const filteredwardb = (wardBoys ?? []).filter(
    (doc) =>
      (doc?.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (doc?.email ?? "").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <DashboardLayout>
      <h1 className="text-lg font-bold mb-4 flex items-center gap-1">
        Dashboard <MdKeyboardArrowRight /> Ward Boys
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={openAdd}
          className="bg-[#293b69] text-white px-8 rounded"
        >
          Add
        </button>
      </div>

      <StaticTable<WardBoy>
        columns={wardBoyColumns}
        data={filteredwardb}
        onEdit={(wardboy) =>
          openEdit((wardboy._id as string) ?? null, {
            name: wardboy.name,
            email: wardboy.email,
            status: wardboy.status,
          })
        }
        onDelete={(id) => setDeleted(id)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {isOpen && (
        <WardFormModal
          formData={formData}
          handleChange={handleChange}
          editId={editId as string | null}
          onClose={close}
          onSubmit={handleSubmit}
        />
      )}

      {deleted && (
        <DeleteWardModal
          onCancel={() => setDeleted(null)}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Wardboy;
