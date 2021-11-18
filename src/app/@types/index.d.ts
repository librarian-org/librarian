export interface Api {
  send: (channel: string, data: unknown) => void;
  sendSync: (channel: string, data: unknown) => void;
  receive: (channel: string, func: (arg0: any) => void) => void;
}

declare global {
  interface Window {
    api: Api;
  }
}
