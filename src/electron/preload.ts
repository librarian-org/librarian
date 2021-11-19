import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: unknown) => {
      ipcRenderer.send(channel, data);
    },
    sendSync: (channel: string, ...arg: any) => {
      return ipcRenderer.sendSync(channel, arg);
    },
    receive: (channel: string, listener: (event: any, ...arg: any) => void) => {
      ipcRenderer.on(channel, listener);
    },
});
