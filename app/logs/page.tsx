"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { fetchLogs, Log, clearLog, clearLogs } from "@/srevices/logs";
import NoDataRow from "@/components/common/NoDataRow";

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
              className=" px-4 py-2 border-2 rounded-lg  hover:bg-cyan-700"
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
                  <th>Clear</th>
                </tr>
              </thead>

              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log._id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getActionColor(
                            log.action,
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td>{log.module}</td>
                      <td>{log.description}</td>

                      <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                            log.status,
                          )}`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleClearLog(log._id)}
                          className="bg-white text-red-600 border p-2 rounded-xl dark:bg-black"
                        >
                          Clear
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
