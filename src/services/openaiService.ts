import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function processCommand(command: string) {
    const response = await openai.completions.create({
      model: "gpt-4",
      prompt: `Interpret this todo command: ${command}`,
      max_tokens: 50,
    });
  
    return response.choices[0]?.text?.trim();
  }
