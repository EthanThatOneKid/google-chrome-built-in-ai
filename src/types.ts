export type RequestAny = RequestActiveElement | RequestActiveElementEdit;

export interface RequestActiveElement {
  type: "request-active-element";
}

export interface ResponseActiveElement {
  value: string;
}

export interface RequestActiveElementEdit {
  type: "request-active-element-edit";
  value: string;
}
