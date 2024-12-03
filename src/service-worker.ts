import type * as _ from "chrome-types";
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

  // InvalidStateError: The session cannot be created.
  // TypeError: Cannot read properties of undefined (reading 'languageModel')
  const llm = await createLLM();
  const result = await llm.prompt(value);

  console.log({ value, result });
});

function requestActiveElement(tabID: number): Promise<ResponseActiveElement> {
  return chrome.tabs.sendMessage(
    tabID,
    { type: "request-active-element" } satisfies RequestActiveElement,
  );
}

function createLLM(): Promise<any> {
  return (chrome as any).aiOriginTrial.languageModel.create({
    systemPrompt:
      "You are a helpful assistant that lives inside of a Chrome Extension " +
      "that interprets the active editable element's current value in a tab" +
      "and generates exactly the right text to assist the user, given the context.",
    monitor(m: any) {
      m.addEventListener("downloadprogress", (e: any) => {
        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
      });
    },
  });
}
