const {GoogleGenAI} = require("@google/genai");
const {generateReport} = require("./reportService");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const askAI = async(question) => {
    const report = await generateReport();

    const prompt = `
        You are an AI assistant for a university admission system.

        Rules:
        - Answer ONLY from the provided report.
        - Do not invent information.
        - If the report does not contain the answer, say "I don't have enough data."
        - Keep answers concise and use bullet points when appropriate.

        Report:
        ${JSON.stringify(report, null, 2)}

        Question:
        ${question}
        `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    })
    return response.text;
}

module.exports = {askAI}