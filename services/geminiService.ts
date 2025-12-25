import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIActionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const TEXT_MODEL_NAME = 'gemini-3-flash-preview';
const IMAGE_MODEL_NAME = 'imagen-4.0-generate-001';

export const generateAIResponse = async (
  action: AIActionType,
  context: string
): Promise<string> => {
  let systemInstruction = "";
  let prompt = "";

  switch (action) {
    case AIActionType.GENERATE_IDEAS:
      systemInstruction = "You are a world-class content strategist. Generate 5 high-potential content ideas based on the user's topic. Focus on: 1) Contrarian views ('Why everyone is wrong about X'), 2) Data-backed insights, 3) Personal stories/case studies. Avoid generic advice.";
      prompt = `Topic: ${context}. Provide 5 ideas with a brief 'Why this works' explanation for each.`;
      break;
    case AIActionType.GENERATE_HOOKS:
      systemInstruction = "You are a viral copywriting expert. Write 3 distinct 'Scroll-Stopping' hooks using these specific frameworks: 1) The Negative Angle ('Stop doing X'), 2) The Specific Outcome ('How I got Y results in Z days'), 3) The Curiosity Gap (Implying a secret).";
      prompt = `Topic/Context: ${context}. Write 3 hooks.`;
      break;
    case AIActionType.POLISH_CONTENT:
      systemInstruction = "You are a senior editor at a top publication. Rewrite the provided text to be punchier, clearer, and more authoritative. Use active voice. Vary sentence length. Remove fluff.";
      prompt = `Draft Text: ${context}`;
      break;
    case AIActionType.SEO_KEYWORDS:
      systemInstruction = "You are an advanced SEO specialist. Suggest 5 long-tail keywords (4+ words) with high commercial intent relevant to the topic. Explain the user intent behind each.";
      prompt = `Niche/Topic: ${context}`;
      break;
    case AIActionType.REPURPOSE_CONTENT:
      systemInstruction = "You are a social media growth expert. Repurpose the provided content idea or text into three formats: 1) A short, punchy LinkedIn text post (max 200 words) with bullet points. 2) A Twitter/X thread outline (5 tweets). 3) A 60-second Short-Form Video Script (TikTok/Reels) using a 'Hook, Value, CTA' structure. Focus on high engagement.";
      prompt = `Content to Repurpose: ${context}`;
      break;
    default:
      systemInstruction = "You are a helpful AI assistant for content creators.";
      prompt = context;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI. Please try again.";
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
     const response = await ai.models.generateImages({
        model: IMAGE_MODEL_NAME,
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9'
        }
    });
    const base64 = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64) {
        return `data:image/jpeg;base64,${base64}`;
    }
    return "";
  } catch (error) {
    console.error("Imagen API Error:", error);
    throw new Error("Failed to generate image.");
  }
}