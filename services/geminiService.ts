import { GoogleGenAI } from "@google/genai";

// We use the environment variable as per system instructions for the Frontend component
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askDentalAssistant = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Eres un asistente virtual amable y profesional de una clínica dental. 
        Tu objetivo es motivar al usuario a agendar una cita aprovechando la promoción actual: 
        Limpieza dental + Valoración general por $600 MXN (Precio regular $900 MXN).
        Responde de manera breve (máximo 50 palabras), empática y clara.
        Si preguntan sobre dolor, asegura que los procedimientos son cuidadosos.
        Si preguntan sobre la ubicación, di que el personal les dará los detalles al contactarlos.`,
      },
    });
    
    return response.text || "Lo siento, no pude procesar tu pregunta en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Disculpa, hubo un error técnico. Por favor intenta más tarde o llena el formulario.";
  }
};