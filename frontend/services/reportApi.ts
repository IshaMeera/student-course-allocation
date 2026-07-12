import api from "./api";

export const getReports = async () => {
  const { data } = await api.get("/reports");
  return data.data;
};