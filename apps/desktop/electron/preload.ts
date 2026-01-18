// Use CommonJS require for Electron preload scripts
// Wrap in IIFE to ensure it executes as a script, not a module
(function () {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- Electron preload must use require()
  const { contextBridge, ipcRenderer } = require("electron");

  // Expose protected methods that allow the renderer process to use
  // the ipcRenderer without exposing the entire object
  contextBridge.exposeInMainWorld("electron", {
    platform: process.platform,
    // Add more Electron APIs as needed
    send: (channel: string, data: unknown) => {
      const validChannels = ["toMain"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: string, func: (...args: unknown[]) => void) => {
      const validChannels = ["fromMain"];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (_event, ...args: unknown[]) => func(...args));
      }
    },
  });
})();
