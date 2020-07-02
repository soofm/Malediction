import { contextBridge, ipcRenderer } from 'electron'

const inChannels = ['select-install-directory-message']
const outChannels = ['select-install-directory-reply']

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel: string, data: any): void => {
      if (inChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
      }
    },
    on: (channel: string, f: Function): void => {
      if (outChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => f(...args))
      }
    }
  }
)
