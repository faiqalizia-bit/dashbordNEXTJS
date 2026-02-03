import API from "@/api";

export const getGuards = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/guards?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching guards:", error);
    throw error;
  }
};

export const createGuard = async (data: Record<string, unknown>) => {
  try {
    const res = await API.post("/guards", data);
    return res;
  } catch (error) {
    console.error("Error creating guard:", error);
    throw error;
  }
};

export const updateGuard = async (id: string, data: Record<string, unknown>) => {
  try {
    const res = await API.put(`/guards/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error updating guard:", error);
    throw error;
  }
};

export const deleteGuard = async (id:string) => {
  try {
    const res = await API.delete(`/guards/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting guard:", error);
    throw error;
  }
};