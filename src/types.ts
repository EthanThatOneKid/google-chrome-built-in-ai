export type RequestAny = RequestActiveElement;

export interface RequestActiveElement {
  type: "request-active-element";
}

export interface ResponseActiveElement {
  value: string;
}
