import { useState } from "react";
import { UseFormModalReturn, FormChangeEvent, ID } from "@/types";

export function useFormModal<T>(initialData: T): UseFormModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<ID>(null);
  const [formData, setFormData] = useState<T>(initialData);

  const openAdd = () => {
    setEditId(null);
    setFormData(initialData);
    setIsOpen(true);
  };

  const openEdit = (id: ID, data: T) => {
    setEditId(id);
    setFormData(data);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditId(null);
    setFormData(initialData);
  };

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    isOpen,
    editId,
    formData,
    setFormData,
    openAdd,
    openEdit,
    close,
    handleChange,
  };
}


// import { useState } from "react";

// export const useFormModal = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({});

//   const openAdd = () => {
//     setEditId(null);
//     setFormData("");
//     setIsOpen(true);
//   };

//   const openEdit = (id,data) => {
//     setEditId(id);
//     setFormData(data);
//     setIsOpen(true);
//   };

//   const close = () => {
//     setIsOpen(false);
//     setEditId(null);
//     setFormData("");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return {
//     isOpen,
//     editId,
//     formData,
//     setFormData,
//     openAdd,
//     openEdit,
//     close,
//     handleChange,
//   };
// };
