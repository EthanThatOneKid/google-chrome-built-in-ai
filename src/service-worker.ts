import type * as _ from "chrome-types";

// https://developer.chrome.com/docs/extensions/develop/ui/context-menu

chrome.runtime.onInstalled.addListener(() => {
  const example = chrome.contextMenus.create({
    id: "example",
    title: "Example",
    type: "normal",
    contexts: ["editable"],
  });

  console.log({ example });
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  if (tab?.id === undefined) {
    return;
  }

  // Send message to tab with the editable item.
  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
  console.log({ response, item });
});
