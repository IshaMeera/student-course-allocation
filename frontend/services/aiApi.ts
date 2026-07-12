import api from "./api";

export const askAI = async (question: string) => {
  const { data } = await api.post("/ai/query", {
    question,
  });

  return data;
};