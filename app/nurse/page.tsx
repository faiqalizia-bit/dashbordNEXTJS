
"use client";
import {MdKeyboardArrowRight } from "react-icons/md"
import { useState, useCallback, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/Layout';
import usePagination from '@/components/common/usePagination';
import StaticTable from '@/components/common/table';
import { useFormModal } from '@/components/common/useFormModal';
import Pagination from '@/components/common/Pagination';
import { NurseType } from "@/components/nurses/type";
import CreateNurse from "@/components/nurses/create";
import DeleteNurseModal from "@/components/nurses/delete";
import { getNurses, createNurse, updateNurse, deleteNurse } from "@/srevices/nurse";
import { nurseColumns } from "@/components/common/tablecolumn";
function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(null);
  const { page, setPage, totalPages, setTotalPages } = usePagination(1);
  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(NurseType);

  const fetchNurses = useCallback(
    async (pageNumber = page) => {
      const res = await getNurses(pageNumber, 10);
      setNurses(res.data.nurses);
      setTotalPages(res.data.totalPages);
    },
    [page, setTotalPages],
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await getNurses(page, 10);
        setNurses(res.data.nurses);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      await updateNurse(editId as string, formData as unknown as Record<string, unknown>);
    } else {
      await createNurse(formData as unknown as Record<string, unknown>);
    }

    fetchNurses(page);
    close();
  };

  const handleDelete = async () => {
    await deleteNurse(deleted);
    fetchNurses(page);
    setDeleted(null);
  };

  const filteredNurses = nurses.filter(
    (n) =>
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <h1 className="text-lg font-bold mb-4 flex items-center gap-1">
        Dashboard <MdKeyboardArrowRight /> Nurses
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
          className="bg-orange-700 text-white px-8 rounded"
        >
          Add
        </button>
      </div>

      <StaticTable
        columns={nurseColumns}
        data={filteredNurses}
        onEdit={(nurse) =>
          openEdit(nurse._id, {
            name: nurse.name,
            email: nurse.email,
            status: nurse.status,
          })
        }
        onDelete={(id) => setDeleted(id)}
      />

      <Pagination onPageChange={setPage} page={page} totalPages={totalPages} />

      {isOpen && (
        <CreateNurse
          formData={formData}
          handleChange={handleChange}
          editId={editId}
          onClose={close}
          onSubmit={handleSubmit}
        />
      )}

      {deleted && (
        <DeleteNurseModal
          onCancel={() => setDeleted(null)}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Nurses;