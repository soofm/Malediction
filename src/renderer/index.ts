/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')

const installDirEl = document.getElementById('install-dir')

async function selectInstallDir () {
  const { remote } = require('electron')
  const dialog = remote.dialog
  const dialogResult = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (!dialogResult.canceled) {
    const installDir = dialogResult.filePaths[0]
    if (await checkInstallDir(installDir)) {
      installDirEl.innerText = installDir
      installDirEl.classList.add('show')
    }
  }
}

async function checkInstallDir (installDir: string) {
  const options = { cwd: installDir }
  try {
    const [entries, addons, wtf] = await Promise.all([
      fg(['World*.app', 'Wow*.exe'], options),
      fs.promises.stat(path.resolve(installDir, 'Interface/AddOns')),
      fs.promises.stat(path.resolve(installDir, 'WTF'))
    ])

    if (entries.length === 0 || !addons.isDirectory() || !wtf.isDirectory()) {
      throw new Error(`${entries.length}---${addons.isDirectory()}---${wtf.isDirectory()}`)
    }
  } catch (err) {
    alert('World of Warcraft installation not found.' + err)
  }
  return true
}
