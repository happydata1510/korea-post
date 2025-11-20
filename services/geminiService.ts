import { GoogleGenAI } from "@google/genai";

// Safely access process.env.API_KEY avoiding ReferenceError in browser
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("process is not defined");
  }
  return '';
};

const apiKey = getApiKey();

export const generateKUBotResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please ensure process.env.API_KEY is set.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `
      You are "Ho-rangi" (Tiger), a friendly and spirited AI assistant for Korea University (KU). 
      Your tone is enthusiastic, proud, and helpful. 
      You frequently use phrases related to Korea University spirit like "Minjok KU" (National KU) or reference the tiger mascot.
      
      Context:
      - You are embedded in a landing page for a new community site called "KU Connect".
      - Users might ask about the features of this site, or general questions about campus life.
      - If asked about specific real-time data (like today's lunch menu), explain that you are a demo version but on the real site, you would fetch that data instantly.
      - Keep responses concise (under 3 sentences usually) and engaging.
      - Speak in Korean (Hangul) primarily, but can use English if addressed in English.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response in this demo
      }
    });

    return response.text || "죄송합니다. 잠시 후 다시 시도해주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "시스템 오류가 발생했습니다. 잠시 후 다시 이용해주세요.";
  }
};