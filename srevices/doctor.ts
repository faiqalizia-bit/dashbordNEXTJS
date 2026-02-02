import API from "@/api";

export const getDoctors = async (page = 1, limit = 10) => {

    try {
    const response = await API.get(
      `/doctors?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};


export const createDoctor = async (data: Record<string, unknown>) => {
  try {
    const response = await API.post("/doctors", data);
    return response;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (id: string, data: Record<string, unknown>) => {
  try {
    const response = await API.put(`/doctors/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id:string) => {
  try {
    const response = await API.delete(`/doctors/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};