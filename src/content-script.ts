import type { RequestAny, ResponseActiveElement } from "./types.ts";

let lastActiveElement: Element | null = null;

chrome.runtime.onMessage.addListener(
  (request: RequestAny, _sender, sendResponse) => {
    switch (request.type) {
      case "request-active-element": {
        if (document.activeElement === null) {
          throw new Error("No active element");
        }

        lastActiveElement = document.activeElement;
        const activeValue = editable(lastActiveElement).get();
        (sendResponse as (response: ResponseActiveElement) => void)({
          value: activeValue,
        });

        return true;
      }

      default: {
        return false;
      }
    }
  },
);

interface EditableValue {
  get: () => string;
  set: (value: string) => void;
}

function editable(element: Element): EditableValue {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return {
      get: () => element.value,
      set: (value: string) => (element.value = value),
    };
  }

  if (element.getAttribute("contenteditable") === "true") {
    return {
      get: () => element.textContent || "",
      set: (value: string) => (element.textContent = value),
    };
  }

  throw new Error("Element is not editable");
}
