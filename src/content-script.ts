import type { RequestAny, ResponseActiveElement } from "./types.ts";

let lastActiveElement: Element | null = null;

chrome.runtime.onMessage.addListener(
  (
    request: RequestAny,
    _sender,
    sendResponse: (response: ResponseActiveElement) => void,
  ) => {
    switch (request.type) {
      case "request-active-element": {
        if (document.activeElement === null) {
          throw new Error("No active element");
        }

        lastActiveElement = document.activeElement;
        sendResponse({ value: editable(lastActiveElement).get() });
        return true;
      }

      case "request-active-element-edit": {
        if (lastActiveElement === null) {
          throw new Error("No active element");
        }

        editable(lastActiveElement).set(request.value);
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

function _setEditableValue(inputElement: HTMLInputElement, newValue: string) {
  // TODO: Update the value such that the undo stack is preserved.
  //

  // Select the entire value to make it easier to replace.
  inputElement?.select();

  // Replace the selected value with the new value.
  document.execCommand("insertText", false, newValue);
}
