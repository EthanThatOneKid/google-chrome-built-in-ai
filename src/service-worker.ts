import type * as _ from "chrome-types";
import type {
  RequestActiveElement,
  RequestActiveElementEdit,
  ResponseActiveElement,
} from "./types.ts";
import { createPromptAI } from "./prompt-ai.ts";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "google-chrome-built-in-ai",
    title: "Built-in AI",
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

  // Call Chrome Built-in AI API >:3
  const promptAI = await createPromptAI();
  const result = await promptAI(value);

  // Send message to tab to update the editable item.
  await requestActiveElementEdit(tab.id, result);
});

function requestActiveElement(tabID: number): Promise<ResponseActiveElement> {
  return chrome.tabs.sendMessage(
    tabID,
    { type: "request-active-element" } satisfies RequestActiveElement,
  );
}

function requestActiveElementEdit(tabID: number, value: string): Promise<void> {
  return chrome.tabs.sendMessage(
    tabID,
    {
      type: "request-active-element-edit",
      value,
    } satisfies RequestActiveElementEdit,
  );
}
