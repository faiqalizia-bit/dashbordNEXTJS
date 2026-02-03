import { ReactNode, ChangeEvent, FormEvent } from "react";

//    Common / Utility Types


export type ID = string | number | null;

export type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

//    Modal

export interface CustomModalProps {
  editId?: ID;
  title: string;
  editTitle?: string;
  onClose: () => void;
  children: ReactNode;
}

export interface DeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}


//    Form Modal Hook


export interface UseFormModalReturn<T> {
  isOpen: boolean;
  editId: ID;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  openAdd: () => void;
  openEdit: (id: ID, data: T) => void;
  close: () => void;
  handleChange: (e: FormChangeEvent) => void;
}


//    Pagination


export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


//    Table


export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value?: T[keyof T], row?: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}


//    Status Badge


export interface StatusBadgeProps {
  status?: string;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  status: string;
}
