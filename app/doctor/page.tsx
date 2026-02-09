"use client";
import {MdKeyboardArrowRight } from "react-icons/md"
import React, { useState, useCallback, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/Layout';
import usePagination from '@/components/common/usePagination';
import StaticTable from '@/components/common/table';
import { useFormModal } from '@/components/common/useFormModal';
import Pagination from '@/components/common/Pagination';
import { doctorColumns } from '@/components/common/tablecolumn';
import { DoctorType } from '@/components/doctors/type';
import type { Doctor } from '@/components/doctors/type';
import CreateDoctor from '@/components/doctors/create';
import { createDoctor, updateDoctor,getDoctors, deleteDoctor } from '@/srevices/doctor';
import DeleteDoctorModal from '@/components/doctors/delete';

interface DoctorsResponse {
  doctors: Doctor[];
  totalPages: number;
}

function Doctor() {

  const [search, setSearch] = useState<string>("");
  const [deleted, setDeleted] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const { page, setPage, totalPages, setTotalPages } = usePagination(1);

  const {
    isOpen,
    editId,
    formData,
    handleChange,
    openAdd,
    openEdit,
    close,
  } = useFormModal(DoctorType);

  /* ================= FETCH ================= */

  const fetchDoctors = useCallback(
    async (pageNumber: number = page): Promise<void> => {
      try {
        const res = await getDoctors(pageNumber, 10);
        const data: DoctorsResponse = res.data;

        setDoctors(data.doctors);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    },
    [page, setTotalPages],
  );

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare payload and remove empty _id to avoid backend validation issues
    const payload = { ...(formData as unknown as Record<string, unknown>) } as Record<string, unknown>;
    if (payload._id === "" || payload._id == null) delete payload._id;

    try {
      console.log("Creating/updating doctor with payload:", payload);

      if (editId) {
        await updateDoctor(editId as string, payload);
      } else {
        await createDoctor(payload);
      }

      fetchDoctors(page);
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

  /* ================= DELETE ================= */

  const handleDelete = async (): Promise<void> => {
    if (!deleted) return;

    try {
      await deleteDoctor(deleted);
      fetchDoctors(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
  
    (async () => {
      try {
        const res = await getDoctors(page, 10);
        setDoctors(res.data.doctors);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
      
  }, [page, setTotalPages]);

  /* ================= FILTER ================= */

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
   <div className="mb-10 relative py-2">
        <h1 className="text-lg font-bold mb-4">
          {" "}
          <div className="flex  
           items-center">
            Dashboard
            <span className="mt-1
            ">
              <MdKeyboardArrowRight />{" "}
            </span>
            Doctors
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
            className="bg-orange-700 text-white  px-8 rounded"
          >
            Add
          </button>
        </div>

        <StaticTable<Doctor>
          columns={doctorColumns}
          data={filteredDoctors}
          onEdit={(doc) =>
            openEdit((doc._id as string) ?? null, {
              name: doc.name,
              email: doc.email,
              status: doc.status,
            })
          }
          onDelete={(id) => setDeleted(id)}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {isOpen && (
          <CreateDoctor
            formData={formData}
            handleChange={handleChange}
            editId={editId as string | null}
            onClose={close}
            onSubmit={handleSubmit}
          />
        )}

        {deleted && (
          <DeleteDoctorModal
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
        
  )
}

export default Doctor