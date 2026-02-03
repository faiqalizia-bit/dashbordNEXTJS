export interface Guard {
  _id?: string;
  name: string;
  email: string;
  status: string;
}

export const GuardType:Guard = {
    _id: "",
    name: "",
    email: "",
    status: "",
}