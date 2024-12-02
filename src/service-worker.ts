import type * as _ from "chrome-types";

// https://developer.chrome.com/docs/extensions/develop/ui/context-menu

chrome.runtime.onInstalled.addListener(() => {
  const example = chrome.contextMenus.create({
    id: "example",
    title: "Example",
    type: "normal",
    contexts: ["all"],
  });

  console.log({ example });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  console.log("Context menu clicked", { item, tab });
});
