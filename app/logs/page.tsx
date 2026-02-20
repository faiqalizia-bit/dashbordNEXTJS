"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import { fetchLogs, Log, clearLog, clearLogs, PaginatedLogs } from "@/srevices/logs";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/components/common/usePagination";

export default function LogTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { page, setPage, totalPages, setTotalPages } = usePagination(1);

  const loadLogs = async (pageNumber = page) => {
    setLoading(true);
    setError("");
    try {
      const res: PaginatedLogs = await fetchLogs(pageNumber, 10);
      setLogs(res.data ?? []);
      if (res.totalPages) setTotalPages(res.totalPages);
      else if (typeof res.total === "number") setTotalPages(Math.max(1, Math.ceil(res.total / 10)));
      else setTotalPages(1);
 
    } catch (err) {
      setError("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(page);
  }, [page]);

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
        
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
          <h2 className="text-xl sm:text-2xl font-semibold">Activity Logs</h2>

          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-cyan-700 transition"
            >
              Clear All Logs
            </button>
          )}
        </div>

        {loading && <p>Loading logs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="hidden md:table-header-group">
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
                      className="border-b md:table-row block md:table-row hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg mb-4 md:mb-0 p-4 md:p-0"
                    >
                      <td className="py-2 md:py-4 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">Action:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getActionColor(
                            log.action,
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="py-2 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">Module:</span>
                        <span>{log.module}</span>
                      </td>

                      <td className="py-2 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">
                          Description:
                        </span>
                        <span className="text-right md:text-left">
                          {log.description}
                        </span>
                      </td>

                      <td className="py-2 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">Date:</span>
                        <span>
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-2 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">Status:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                            log.status,
                          )}`}
                        >
                          {log.status}
                        </span>
                      </td>

                      {/* Clear Button */}
                      <td className="py-2 flex justify-between md:table-cell">
                        <span className="font-semibold md:hidden">Clear:</span>
                        <button
                          onClick={() => handleClearLog(log._id)}
                          className="bg-white text-red-600 border px-3 py-1 rounded-lg dark:bg-black"
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
        <Pagination
        page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </DashboardLayout>
  );
}





























