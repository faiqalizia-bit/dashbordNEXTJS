"use client";

import { useEffect, useState } from "react";
import { MdMedicalServices, MdPersonalInjury, MdApartment, MdSecurity } from "react-icons/md";
import { FaUserNurse, FaPeopleCarry } from "react-icons/fa";
import API from "@/api";
import { Doctor } from "@/types";
import { Patient } from "../patients/type";
import Card from "./Card";
import StaticTable from "../common/table";
import { doctorColumns } from "../common/tablecolumn";
import { patientColumns } from "../common/tablecolumn";
import { ReactNode } from "react";
interface User {
  name: string;
}

interface CountStats {
  total: number;
  active: number;
  inactive: number;
}

interface DashboardStats {
  doctors: CountStats;
  nurses: CountStats;
  patients: CountStats;
  wardBoys: CountStats;
  departments: CountStats;
  recptionists: CountStats;
}


interface DashboardCard {
  title: string;
  icon: ReactNode;
  totalCount: number;
  activeCount: number;
  inActiveCount: number;
}

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
   const [user, setUser] = useState<User>({ name: "Guest" });

   
  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      try {
        const parsedUser= JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUser({ name: "Guest" });
      }
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats",);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await API.get<{ doctors: Doctor[] }>("/doctors");
      setDoctors(res.data.doctors);
    };

    const fetchPatients = async () => {
      const res = await API.get<{ patients: Patient[] }>("/patients");
      setPatients(res.data.patients);
    };

    fetchDoctors();
    fetchPatients();
  }, []);

  const cards: DashboardCard[] = stats
    ? [
        {
          title: "Doctors",
          icon: <MdMedicalServices />,
          totalCount: stats.doctors.total,
          activeCount: stats.doctors.active,
          inActiveCount: stats.doctors.inactive,
        },
        {
          title: "Nurses",
          icon: <FaUserNurse />,
          totalCount: stats.nurses.total,
          activeCount: stats.nurses.active,
          inActiveCount: stats.nurses.inactive,
        },
        {
          title: "Patients",
          icon: <MdPersonalInjury />,
          totalCount: stats.patients.total,
          activeCount: stats.patients.active,
          inActiveCount: stats.patients.inactive,
        },
        {
          title: "Ward Boys",
          icon: <FaPeopleCarry />,
          totalCount: stats.wardBoys.total,
          activeCount: stats.wardBoys.active,
          inActiveCount: stats.wardBoys.inactive,
        },
        {
          title: "Departments",
          icon: <MdApartment />,
          totalCount: stats.departments.total,
          activeCount: stats.departments.active,
          inActiveCount: stats.departments.inactive,
        },
        {
          title: "Recptionists",
          icon: <MdSecurity />,
          totalCount: stats.recptionists.total,
          activeCount: stats.recptionists.active,
          inActiveCount: stats.recptionists.inactive,
        },
      ]
    : [];

  return (
    <div className="bg-neutral w-full">
      <h1 className="text-xl sm:text-2xl lg:text-3xl pl-5 font-bold py-2">Dashboard</h1>
      <p className="ml-5">Welcome back 👋, {user.name.toUpperCase()}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-5">
        
        {cards.map((item, idx) => (
          <Card
            key={idx}
            icon={item.icon}
            title={item.title}
            value={item.totalCount}
            activeCount={item.activeCount}
            inActiveCount={item.inActiveCount}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 w-full p-5">
        {doctors.length > 0 && (
          <Card title="Doctors" className="w-full lg:w-1/2" value={doctors.length} recentCard viewCard viewAllLink = "/doctor">
            <StaticTable
              columns={doctorColumns}
              data={doctors.slice(0, 5)}
              showActions={false}
              
            />
          </Card>
        )}

        <Card title="Patients" className="w-full lg:w-1/2" value={patients.length} recentCard viewCard viewAllLink = "/patient">
          {patients.length > 0 && (
            <StaticTable
              columns={patientColumns}
              data={patients.slice(0, 5)}
              showActions={false}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;
