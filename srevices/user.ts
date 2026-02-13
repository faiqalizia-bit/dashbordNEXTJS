import API from "@/api"

export const updateUser = async (
  id: string,
  data: {
    name: string
    email: string
    password?: string
  }
) => {
  const res = await API.put(`/users/${id}`, data)
  return res.data}

export const getProfile = async (id:string) => {
  const res = await API.get(`/users/${id}`)
  return {
    id: res.data.id,
    name: res.data.name,
    email: res.data.email,
  }
}



export const getUsers = async () => {
  const res = await API.get("/users")
  return res.data
}
