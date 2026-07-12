import api from "./api";
import { StudentPayload } from "@/types/student";

export const getStudents = async () => {
  const { data } = await api.get("/students");
  return data.data;
};

export const getStudent = async (id: string) => {
  const { data } = await api.get(`/students/${id}`);
  return data.data;
};

export const createStudent = async (student: StudentPayload) => {
  const { data } = await api.post("/students", student);
  return data.data;
};

export const updateStudent = async (
  id: string,
  student: StudentPayload
) => {
  const { data } = await api.put(`/students/${id}`, student);
  return data.data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await api.delete(`/students/${id}`);
  return data.data;
};