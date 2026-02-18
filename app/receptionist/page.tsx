"use client";
import {MdKeyboardArrowRight } from "react-icons/md"
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/Layout';
import usePagination from '@/components/common/usePagination';
import StaticTable from '@/components/common/table';
import { useFormModal } from '@/components/common/useFormModal';
import Pagination from '@/components/common/Pagination';
import { getReceptionists,createReceptionist, deleteReceptionist,updateReceptionist } from "@/srevices/receptionist";
import CreatReceptionist from "@/components/Receptionist/create";
import {  ReceptionistType } from "@/components/Receptionist/type";
import { receptionistColumns } from "@/components/common/tablecolumn";
import DeleteReceptionist from "@/components/Receptionist/delete";
import type { Receptionist } from "@/components/Receptionist/type";

interface ReceptionistResponse{
    receptionists: Receptionist[];
    totalPages: number;
}

function Receptionist() {
  const [search, setSearch] = useState<string>("");
  const [deleted, setDeleted] = useState<string | null>(null);
  const [receptionist, setReceptionist] = useState<Receptionist[]>([]);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1);

  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(ReceptionistType);

  const fetchReceptionists = async (pageNumber = page) => {
    try {
      const res = await getReceptionists(pageNumber, 10);
      setReceptionist(res.data.receptionists);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   const payload = { ...(formData as unknown as Record<string, unknown>) } as Record<string, unknown>;
       if (payload._id === "" || payload._id == null) delete payload._id;
   
       try {
         console.log("Creating/updating doctor with payload:", payload);
   
         if (editId) {
           await updateReceptionist(editId as string, payload);
         } else {
           await createReceptionist(payload);
         }
   
         fetchReceptionists(page);
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

  const handleDelete = async () => {
    try {
       if (!deleted) return;
      await deleteReceptionist(deleted);
      fetchReceptionists(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getReceptionists(page, 10);
        setReceptionist(res.data.receptionists);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const filteredReceptionist = receptionist.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-lg font-bold mb-4">
          {" "}
          <div className="flex gap-[1px] items-center">
            Dashboard
            <span className="mt-[2px]">
              <MdKeyboardArrowRight />{" "}
            </span>
            Receptionists
          </div>
        </h1>

        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={openAdd}
            className="bg-(--button) text-(--buttontext) px-8 rounded"
          >
            Add
          </button>
        </div>

        <StaticTable
          columns={receptionistColumns}
          data={filteredReceptionist}
          onEdit={(doc) =>
            openEdit((doc._id  as string)?? null, {
              name: doc.name,
              email: doc.email,
              status: doc.status,
            })
          }
          onDelete={(id) => setDeleted(id)}
        />
        <Pagination
        page={page} totalPages={totalPages} onPageChange={setPage}
        />
        {isOpen && (
          <CreatReceptionist
            formData={formData}
            handleChange={handleChange}
            editId={editId as string | null}
            onClose={close}
            onSubmit={handleSubmit}
          />
        )}

        {deleted && (
          <DeleteReceptionist
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Receptionist;
