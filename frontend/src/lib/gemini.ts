"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function evaluateAnswer(question: string, transcript: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Act as an expert AI Interview Coach.
    Question: ${question}
    Student's Answer: ${transcript}

    Evaluate the answer based on:
    1. Communication Clarity
    2. Technical Accuracy
    3. Professional Tone

    Return a JSON object with:
    {
      "clarity": number (0-100),
      "accuracy": number (0-100),
      "tone": number (0-100),
      "overall": number (0-100),
      "strengths": string[],
      "improvements": string[],
      "tips": string
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Simplified parsing (in production, use robust JSON extraction)
        return JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
    } catch (error) {
        console.error("Gemini Evaluation Error:", error);
        return {
            clarity: 70,
            accuracy: 70,
            tone: 70,
            overall: 70,
            strengths: ["Clear voice"],
            improvements: ["More detail required"],
            tips: "Keep practicing!"

        };
    }
}

export async function chatWithAI(message: string, history: { role: string, parts: string[] }[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: history.map(h => ({
            role: h.role,
            parts: h.parts.map(p => ({ text: p }))
        })),
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
}
