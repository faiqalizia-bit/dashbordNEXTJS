const API = "http://localhost:5000/api";

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
    const res = await fetch(`${API}/logs`, );

    if (!res.ok) throw new Error("Failed to fetch logs");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};




