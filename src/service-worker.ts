import type * as _ from "chrome-types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RequestActiveElement, ResponseActiveElement } from "./types.ts";

// https://developer.chrome.com/docs/extensions/develop/ui/context-menu
// https://developer.chrome.com/docs/extensions/ai/prompt-api

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "example",
    title: "Example",
    type: "normal",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener(async (_item, tab) => {
  if (tab?.id === undefined) {
    return;
  }

  // Send message to tab with the editable item.
  const { value } = await requestActiveElement(tab.id);
  if (!value) {
    return;
  }

  // TODO: Call Chrome Built-in AI API >:3
  console.log({ value });

  const promptAI = await createAI();
  const result = await promptAI(value);
  console.log({ value, result });
});

function requestActiveElement(tabID: number): Promise<ResponseActiveElement> {
  return chrome.tabs.sendMessage(
    tabID,
    { type: "request-active-element" } satisfies RequestActiveElement,
  );
}

export interface AI {
  (prompt: string): Promise<string>;
}

async function createAI(): Promise<AI> {
  // deno-lint-ignore no-explicit-any
  const capabilities = await (chrome as any)?.aiOriginTrial?.languageModel
    .capabilities();
  console.info({ capabilities });

  // TODO: Double check this.
  if (capabilities?.status === "success") {
    return await createLocalAI();
  }

  console.warn("Local AI is not available. Using remote AI.");
  return createRemoteAI();
}

function createRemoteAI(): AI {
  const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return (prompt: string) =>
    model.generateContent(prompt)
      .then((result) => result.response.text());
}

async function createLocalAI(): Promise<AI> {
  // deno-lint-ignore no-explicit-any
  return await (chrome as any)?.aiOriginTrial?.languageModel.create({
    systemPrompt:
      "You are a helpful assistant that lives inside of a Chrome Extension " +
      "that interprets the active editable element's current value in a tab" +
      "and generates exactly the right text to assist the user, given the context.",
    // deno-lint-ignore no-explicit-any
    monitor(m: any) {
      // deno-lint-ignore no-explicit-any
      m.addEventListener("downloadprogress", (e: any) => {
        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
      });
    },
  }).prompt;
}
