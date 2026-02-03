import StatusBadge from "./statusbadge";
import type { Column } from '@/types';
import type { Doctor } from '@/components/doctors/type';
import type { Nurse } from "../nurses/type";
import { Patient } from "../patients/type"; 
import { WardBoy } from "../wardboy/type";
import { Guard } from "../guards/type";
import { Receptionist } from "../Receptionist/type";
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
export const nurseColumns: Column<Nurse>[] = [
  {
    key: "name" ,
    label: "Name",
  },
  {
    key: "email" ,
    label: "Email",
  },
  {
    key: "status" ,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
export const patientColumns: Column<Patient>[] = [
  {
    key: "name" ,
    label: "Name",
  },
  {
    key: "email"  ,
    label: "Email",
  },
  {
    key: "status"  ,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
export const wardBoyColumns: Column<WardBoy>[] = [
  {
    key: "name" ,
    label: "Name",
  },
  {
    key: "email"  ,
    label: "Email",
  },
  {
    key: "status"  ,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
export const guardColumns: Column<Guard>[] = [
  {
    key: "name" ,
    label: "Name",
  },
  {
    key: "email"  ,
    label: "Email",
  },
  {
    key: "status"  ,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
export const receptionistColumns: Column<Receptionist>[] = [
  {
    key: "name" ,
    label: "Name",
  },
  {
    key: "email"  ,
    label: "Email",
  },
  {
    key: "status"  ,
    label: "Status",
    render: (value?: string) => <StatusBadge status={value} />,
  },
];
