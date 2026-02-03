import API from "@/api";
export const getReceptionists = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/receptionists?page=${page}&limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching receptinists:", error);
    throw error;
  }
};

export const createReceptionist = async (data: Record<string, unknown>) => {
  try {
    const res = await API.post("/receptionists", data);
    return res;
  } catch (error) {
    console.error("Error creating receptinists:", error);
    throw error;
  }
};

export const updateReceptionist =async(id:string, data: Record<string, unknown>) =>{
    try{
        const res= await API.put(`/receptionists/${id}`, data)
        return res
    } catch(error){
        console.error("error updating receptionist", error)
        throw error;
    }
}

export const deleteReceptionist = async (id:string) => {
  try {
    const res = await API.delete(`/receptionists/${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting receptionist:", error);
    throw error;
  }
};