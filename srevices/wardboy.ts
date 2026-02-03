import API from "@/api";

export const getWardBoys = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/wardboys?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching wardboys:", error);
    throw error;
  }
};

export const createWardBoy = async (data:Record<string, unknown>) => {
  try {
    const res = await API.post("/wardboys", data);
    return res;
  } catch (error) {
    console.error("Error creating wardboy:", error);
    throw error;
  }
};

export const updateWardBoy = async (id:string, data:Record<string, unknown>) => {
  try {
    const res = await API.put(`/wardboys/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error updating wardboy:", error);
    throw error;
  }
};

export const deleteWardBoy = async (id:string) => {
  try {
    const res = await API.delete(`/wardboys/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting wardboy:", error);
    throw error;
  }
};

