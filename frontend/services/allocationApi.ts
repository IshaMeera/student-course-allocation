import api from "./api";

export const recalculateAllocation = async () => {
  const { data } = await api.post("/allocation/recalculate");
  return data;
};