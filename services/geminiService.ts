import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
  console.warn("API_KEY environment variable is not set. AI features will be disabled.");
}

export const askGeminiAboutFile = async (question: string, context?: string): Promise<string> => {
  if (!ai) return "Извините, API ключ не настроен.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Ты эксперт по файловым системам и расширениям. 
      Ответь на вопрос пользователя максимально точно и полезно.
      Контекст (если есть): ${context || 'Нет контекста'}.
      Вопрос пользователя: ${question}
      
      Отвечай на русском языке. Будь краток и технически точен.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Не удалось получить ответ от модели.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к ИИ. Попробуйте позже.";
  }
};