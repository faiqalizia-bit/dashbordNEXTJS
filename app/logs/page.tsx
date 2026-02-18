"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { fetchLogs, Log, clearLog, clearLogs } from "@/srevices/logs";

export default function LogTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchLogs();
      setLogs(data);
    } catch (err) {
      setError("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

   const handleClearLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return;

    try {
      await clearLog(id);
      setLogs((prev) => prev.filter((log) => log._id !== id));
    } catch (error) {
      alert("Failed to delete log");
    }
  };

  
  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to delete ALL logs?")) return;

    try {
      await clearLogs();
      setLogs([]);
    } catch (error) {
      alert("Failed to delete logs");
    }
  };
  const getActionColor = (action: string) => {
    if (action === "CREATE") return "bg-green-100 text-green-700";
    if (action === "UPDATE") return "bg-blue-100 text-blue-700";
    if (action === "DELETE") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };
  const getStatusColor = (status: string) => {
    if (status === "Success") return "bg-green-100 text-green-700";
    if (status === "Failed") return "bg-red-300 text-blue-700";
    if (status === "Deleted") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Activity Logs</h2>
          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Clear All Logs
            </button>
          )}
        </div>
        {loading && <p>Loading logs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-3">Action</th>
                  <th>Module</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log._id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>{log.module}</td>
                    <td>{log.description}</td>
                   
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                    <td>
                       <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </td>
                      <td>
                      <button
                        onClick={() => handleClearLog(log._id)}
                        className="text-red-600 hover:underline"
                      >
                        Clear
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}














































// import DashboardLayout from "@/components/dashboard/Layout";

// export default function LogTable() {
//   return (
//     <DashboardLayout>
//     <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
//       <h2 className="text-2xl font-semibold mb-5">Activity Logs</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left border-collapse">
//           <thead>
//             <tr className="border-b dark:border-gray-700 text-gray-500">
//               <th className="py-3">Action</th>
//               <th>Module</th>
//               <th>Description</th>
//               <th>User</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-4">
//                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
//                   CREATE
//                 </span>
//              </td>
//               <td>Doctor</td>
//               <td>New doctor added</td>
//               <td>Admin</td>
//               <td>17 Feb 2026, 10:30 AM</td>
//               <td>
//                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
//                   Success
//                 </span>
//               </td>
//             </tr>

//             <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-4">
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                   UPDATE
//                 </span>
//               </td>
//               <td>Patient</td>
//               <td>Patient record updated</td>
//               <td>Nurse</td>
//               <td>17 Feb 2026, 11:10 AM</td>
//               <td>
//                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
//                   Success
//                 </span>
//               </td>
//             </tr>

//             <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
//               <td className="py-4">
//                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
//                   DELETE
//                 </span>
//               </td>
//               <td>User</td>
//               <td>User account removed</td>
//               <td>Admin</td>
//               <td>17 Feb 2026, 12:00 PM</td>
//               <td>
//                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
//                   Deleted
//                 </span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }



