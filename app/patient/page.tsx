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
import { PatientType } from "@/components/patients/type";
import DeletePatientModal from "@/components/patients/delete";
import { patientColumns } from "@/components/common/tablecolumn";

function Patients() {
  const [search, setSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [patients, setPatients] = useState([]);
  const { page, setPage,totalPages, setTotalPages } = usePagination(1,1);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePatient(editId, formData);
      } else {
        await createPatient(formData);
      }
      fetchPatients(page);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
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
        setPatients(res.data.patients);
        setTotalPages(res.data.totalPages);
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
          <div className="flex gap-[1px] items-center">
            Dashbord
            <span className="mt-[2px]">
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

        <StaticTable
          columns={patientColumns}
          data={filteredpatients}
          onEdit={(doc) =>
            openEdit(doc._id, {
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
            editId={editId}
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
