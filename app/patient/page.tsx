"use client";
import {MdKeyboardArrowRight } from "react-icons/md"
import { useState, useCallback, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/Layout';
import usePagination from '@/components/common/usePagination';
import StaticTable from '@/components/common/table';
import { useFormModal } from '@/components/common/useFormModal';
import Pagination from '@/components/common/Pagination';
import { createPatient,getPatients,updatePatient,deletePatient } from "@/srevices/patient";
import PatientFormModal from "@/components/patients/create";
import { Patient, PatientType } from "@/components/patients/type";
import DeletePatientModal from "@/components/patients/delete";
import { patientColumns } from "@/components/common/tablecolumn";


interface PatientsResponse {
  patients: Patient[];
  totalPages: number;
}

function Patients() {
  const [search, setSearch] = useState<string>("");
  const [deleted, setDeleted] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const { page, setPage,totalPages, setTotalPages } = usePagination(1);
  const { isOpen, editId, formData, handleChange, openAdd, openEdit, close } =
    useFormModal(PatientType);

  const fetchPatients = useCallback(
    async (pageNumber = page) => {
      try {
        const res = await getPatients(pageNumber, 10);
        setPatients(res.data.patients);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    },
    [page, setTotalPages],
  );

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        const payload = { ...(formData as unknown as Record<string, unknown>) } as Record<string, unknown>;
        if (payload._id === "" || payload._id == null) delete payload._id;
    
        try {
          console.log("Creating/updating doctor with payload:", payload);
    
          if (editId) {
            await updatePatient(editId as string, payload);
          } else {
            await createPatient(payload);
          }
      fetchPatients(page);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (!deleted) return;
      await deletePatient(deleted);
      fetchPatients(page);
      setDeleted(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPatients(page, 10);
        const data: PatientsResponse = res.data;
        setPatients(data.patients);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, setTotalPages]);

  const filteredpatients = patients.filter(
    (nun) =>
      nun.name.toLowerCase().includes(search.toLowerCase()) ||
      nun.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <DashboardLayout>
      <div className="mb-10 relative py-2">
        <h1 className="text-lg font-bold mb-4">
          {" "}
          <div className="flex items-center">
            Dashbord
            <span className="mt-1">
              <MdKeyboardArrowRight />
            </span>
            Patients
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
            className="text-neutral bg-orange-700 px-8 rounded"
          >
            Add
          </button>
        </div>

        <StaticTable<Patient>
          columns={patientColumns}
          data={filteredpatients}
          onEdit={(doc) =>
            openEdit((doc._id as string) ?? null, {
              _id: doc._id as string,
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
          <PatientFormModal
            formData={formData}
            handleChange={handleChange}
            editId={editId as string | null}
            onClose={close}
            onSubmit={handleSubmit}
          />
        )}

        {deleted && (
          <DeletePatientModal
            onCancel={() => setDeleted(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Patients;
