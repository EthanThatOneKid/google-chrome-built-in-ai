import { GoogleGenerativeAI } from "@google/generative-ai";

export const systemPrompt =
  "You are a highly intelligent and helpful assistant integrated into a Chrome Extension. " +
  "Your task is to understand the current value of the active editable element in a tab " +
  "and generate precise and contextually appropriate text to assist the user. " +
  "Only use code fences when explicitly requested by the user. " +
  "Ensure your responses are clear, concise, and relevant to the user's needs.";

export interface PromptAI {
  (prompt: string): Promise<string>;
}

export async function createPromptAI(quiet = true): Promise<PromptAI> {
  // deno-lint-ignore no-explicit-any
  const capabilities = await (chrome as any)?.aiOriginTrial?.languageModel
    .capabilities();
  if (!quiet) {
    console.info({ capabilities });
  }

  if (
    // The current browser supports the Prompt API, and it can be used right away.
    capabilities?.available === "readily" ||
    // The current browser supports the Prompt API, but it needs to download the model first.
    capabilities?.available === "after-download"
  ) {
    return await createBuiltInAI();
  }

  if (!quiet) {
    console.warn("Built-in AI is not available. Using remote AI.");
  }

  return createRemotePromptAI();
}

export function createRemotePromptAI(): PromptAI {
  const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });
  return (prompt: string) =>
    model.generateContent(prompt)
      .then((result) => result.response.text());
}

export async function createBuiltInAI(): Promise<PromptAI> {
  // deno-lint-ignore no-explicit-any
  return await (chrome as any)?.aiOriginTrial?.languageModel.create({
    systemPrompt,
    // deno-lint-ignore no-explicit-any
    monitor(m: any) {
      // deno-lint-ignore no-explicit-any
      m.addEventListener("downloadprogress", (e: any) => {
        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
      });
    },
  }).prompt;
}
