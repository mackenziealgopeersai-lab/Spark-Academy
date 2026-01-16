
import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are Spark, a friendly and enthusiastic AI learning tutor for students aged 11-14. 
Explain complex concepts using simple analogies. Be encouraging and curious. 
Avoid being overly academic; instead, be like a cool older sibling who is an expert in everything.
If a student asks a question, answer it clearly and then ask a follow-up question to keep them thinking.
Keep answers concise (under 150 words).`;

export const getChatResponse = async (history: Message[], userInput: string) => {
  const model = 'gemini-3-flash-preview';
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  // Convert app history to Gemini format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const response = await chat.sendMessage({
    message: userInput
  });

  return response.text;
};

export const generateQuiz = async (topic: string): Promise<Quiz> => {
  const model = 'gemini-3-flash-preview';
  const response = await ai.models.generateContent({
    model,
    contents: `Generate a 3-question multiple choice quiz for a 12-year-old on the topic of: ${topic}. 
    Make it fun but educational. Include explanations for the correct answers.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                correctAnswer: { 
                  type: Type.INTEGER,
                  description: "Index of the correct answer (0-3)"
                },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer", "explanation"]
            }
          }
        },
        required: ["topic", "questions"]
      }
    }
  });

  const jsonStr = response.text || '';
  return JSON.parse(jsonStr);
};
