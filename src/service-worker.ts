import type * as _ from "chrome-types";
import type { RequestActiveElement, ResponseActiveElement } from "./types.ts";

// https://developer.chrome.com/docs/extensions/develop/ui/context-menu

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
});

function requestActiveElement(tabID: number): Promise<ResponseActiveElement> {
  return chrome.tabs.sendMessage(
    tabID,
    { type: "request-active-element" } satisfies RequestActiveElement,
  );
}
