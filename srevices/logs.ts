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


export const fetchLogs = async (): Promise<Log[]> => {
  try {
    const res = await fetch(`${api}/logs`, );
    
    if (!res.ok) throw new Error("Failed to fetch logs");
    
    const data = await res.json();
    return data;
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







