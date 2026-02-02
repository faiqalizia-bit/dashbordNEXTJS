import StatusBadge from "./statusbadge";
import type { Column } from '@/types';
import type { Doctor } from '@/components/doctors/type';

export const doctorColumns: Column<Doctor>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "status",
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];

// nurse/patient columns are structurally the same, use a simple record type
export const nurseColumns: Column<Record<string, string>>[] = [
  {
    key: "name" as keyof Record<string, string>,
    label: "Name",
  },
  {
    key: "email" as keyof Record<string, string>,
    label: "Email",
  },
  {
    key: "status" as keyof Record<string, string>,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
export const patientColumns: Column<Record<string, string>>[] = [
  {
    key: "name" as keyof Record<string, string>,
    label: "Name",
  },
  {
    key: "email" as keyof Record<string, string>,
    label: "Email",
  },
  {
    key: "status" as keyof Record<string, string>,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
