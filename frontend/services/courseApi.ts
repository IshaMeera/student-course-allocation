import api from "./api";
import { Course, CoursePayload } from "@/types/course";

export const getCourses = async (): Promise<Course[]> => {
  const { data } = await api.get("/courses");
  return data.courses;
};

export const getCourse = async(id: string): Promise<Course> =>{
  const {data} = await api.get(`/courses/${id}`);
  return data.data;
}

export const createCourse = async(payload: CoursePayload)=>{
  const {data} = await api.post("/courses", payload);
  return data.data;
}

export const updateCourse = async(id: string, payload: CoursePayload) =>{
  const {data} = await api.put(`/courses/${id}`, payload);
  return data.data;
}

export const deleteCourse = async(id: string) =>{
  const {data} = await api.delete(`/courses/${id}`);
  return data.data;
}