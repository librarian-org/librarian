import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: unknown) => {
      const validChannels = ['get-initial-translations'];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
    },
    sendSync: (channel: string, data: unknown) => {
      const validChannels = ['get-initial-translations'];
      if (validChannels.includes(channel)) {
          ipcRenderer.sendSync(channel, data);
      }
    },
    receive: (channel: string, func: (arg0: any) => void) => {
    //(channel: string, listener: (event: any, ...arg: any) => void) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ipcRenderer.on(channel, (event, ...args) => func(...args));
      // ipcRenderer.on(channel, listener);
    //(channel: string, func: (...args: unknown[]) => void) => {
      // const validChannels = ['language-changed'];
      // if (validChannels.includes(channel)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // ipcRenderer.on(channel, (event, ...args) => func(...args));
      // }
    },
});
