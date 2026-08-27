export type SignType = 'UNASSIGNED' | 'IFRAME' | 'HTML';

export interface Area {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface BaseSignPayload {
  id?: string;
  title?: string;
  description?: string;
  area?: Area;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnassignedPayload {
  type: 'UNASSIGNED';
  message?: string;
}

export interface IframeSignPayload extends BaseSignPayload {
  type: 'IFRAME';
  url: string;
}

export interface HtmlSignPayload extends BaseSignPayload {
  type: 'HTML';
  signTitle?: string;
  content: string;
}

export interface RaspiSignPayload {
  body?: string;
  text?: string;
  title?: string;
  sign?: {
    body?: string;
    text?: string;
    title?: string;
  };
  type?: string;
}

export type SignPayload =
  | UnassignedPayload
  | IframeSignPayload
  | HtmlSignPayload
  | RaspiSignPayload;
