import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { selectInstallDirectory } from './Startup'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow

function createMainWindow (): BrowserWindow {
  const window = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(app.getAppPath(), 'preload.js')
    }
  })

  void window.loadFile('./index.html')

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})

ipcMain.on('select-install-directory-message', (event, args) => {
  void selectInstallDirectory().then(result => event.reply('select-install-directory-reply', result))
})
