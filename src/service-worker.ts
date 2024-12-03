import type * as _ from "chrome-types";
import type { RequestActiveElement } from "./types.ts";

// https://developer.chrome.com/docs/extensions/develop/ui/context-menu

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "example",
    title: "Example",
    type: "normal",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  if (tab?.id === undefined) {
    return;
  }

  // Send message to tab with the editable item.
  const response = await chrome.tabs.sendMessage(
    tab.id,
    {
      type: "request-active-element",
    } satisfies RequestActiveElement,
  );

  console.log({ response, item });
});
