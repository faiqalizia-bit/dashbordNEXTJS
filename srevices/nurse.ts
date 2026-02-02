import API from "@/api";

export const getNurses = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/nurses?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching nurses:", error);
    throw error;
  }
};


export const createNurse = async (data: Record<string, unknown>) => {
  try {
    const res = await API.post("/nurses", data);
    return res;
  } catch (error) {
    console.error("Error creating nurse:", error);
    throw error;
  }
};

export const updateNurse = async (id: string, data: Record<string, unknown>) => {
  try {
    const res = await API.put(`/nurses/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error updating nurse:", error);
    throw error;
  }
};

export const deleteNurse = async (id:string) => {
  try {
    const res = await API.delete(`/nurses/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting nurse:", error);
    throw error;
  }
};
