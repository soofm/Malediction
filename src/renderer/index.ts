/* eslint-disable no-unused-vars */
const { remote } = require('electron')

const installDirEl = document.getElementById('install-dir')

async function selectInstallDir () {
  const dialog = remote.dialog
  const dialogResult = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (!dialogResult.canceled) {
    const installDir = dialogResult.filePaths[0]
    installDirEl.innerText = installDir
  }
}
