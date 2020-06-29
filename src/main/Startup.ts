import { dialog } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import * as fg from 'fast-glob'
import { InstallDirectory, InstallType } from '../common'

export async function selectInstallDirectory (): Promise<InstallDirectory> {
  const dialogResult = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (dialogResult.canceled) {
    return { type: InstallType.None, path: null }
  }

  const installPath = dialogResult.filePaths[0]
  const options = { cwd: installPath }

  try {
    const [entries, addons, wtf] = await Promise.all([
      fg(['World*.app', 'Wow*.exe'], options),
      fs.promises.stat(path.resolve(installPath, 'Interface/AddOns')),
      fs.promises.stat(path.resolve(installPath, 'WTF'))
    ])

    if (entries.length === 0 || !addons.isDirectory() || !wtf.isDirectory()) {
      throw new Error('Could not locate WoW installation files')
    }
  } catch (err) {
    return { type: InstallType.None, path: installPath }
  }

  if (path.basename(installPath) === '_classic_') {
    return { type: InstallType.Classic, path: installPath }
  } else {
    return { type: InstallType.Retail, path: installPath }
  }
}
