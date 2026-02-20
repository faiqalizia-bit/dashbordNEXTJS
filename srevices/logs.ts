import API from "@/api";
const api = "http://localhost:5000/api";

export interface Log {
  _id: string;
  action: string;
  module: string;
  description: string;
  user: string;
  status: string;
  createdAt: string;
}


export type PaginatedLogs = {
  data: Log[];
  total?: number;
  totalPages?: number;
  page?: number;
};

export const fetchLogs = async (page = 1, limit = 10): Promise<PaginatedLogs> => {
  try {
    const res = await fetch(`${api}/logs?page=${page}&limit=${limit}`);

    if (!res.ok) throw new Error("Failed to fetch logs");

    const json = await res.json();

    // Support multiple API shapes: either an array or a paginated object
    if (Array.isArray(json)) {
      return { data: json, total: json.length, totalPages: Math.ceil(json.length / limit), page };
    }

    // If API returns {data, total, totalPages, page} or similar
    const data = json.data ?? json.logs ?? json.items ?? [];
    const total = json.total ?? json.count ?? (Array.isArray(data) ? data.length : undefined);
    const totalPages = json.totalPages ?? json.pages ?? (total ? Math.ceil(total / limit) : undefined);

    return { data, total, totalPages, page: json.page ?? page };
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};
export const clearLogs = async () => {
  try {
    const res = await API.delete("/logs");
    return res;
  } catch (error) {
    console.error("Error deleting logs:", error );
    throw error
  }
};

export const clearLog = async (id: string) => {
  try {
    const res = await API.delete(`/logs/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting log:", error);
    throw error
  }
};







