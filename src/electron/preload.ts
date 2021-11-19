import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: unknown) => {
      ipcRenderer.send(channel, data);
    },
    sendSync: (channel: string, ...arg: any) => {
      return ipcRenderer.sendSync(channel, arg);
    },
    on: (channel: string, listener: (event: any, ...arg: any) => void) => {
      ipcRenderer.on(channel, listener);
    },
    once: (channel: string, listener: (event: any, ...arg: any) => void) => {
      ipcRenderer.once(channel, listener);
    },
    removeListener: (channel: string, listener: (event: any, ...arg: any) => void) => {
      ipcRenderer.removeListener(channel, listener);
    },
    removeAllListeners: (channel: string) => {
      ipcRenderer.removeAllListeners(channel);
    },
});
