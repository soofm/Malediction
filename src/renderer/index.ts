import { Api, InstallType, InstallDirectory } from '../common'

// eslint-ignore-next-line
const api = (window as any).api as Api
const installDirInputEl = document.getElementById('install-dir-input') as HTMLInputElement
const installDirStatusEl = document.getElementById('install-dir-status')

installDirInputEl.addEventListener('click', () => api.send('select-install-directory-message', null))
api.on('select-install-directory-reply', (data: InstallDirectory) => {
  const { type, path } = data
  installDirInputEl.value = path
  if (type === InstallType.Retail) {
    installDirStatusEl.innerText = 'Retail World of Warcraft'
    installDirStatusEl.setAttribute('data-install-status', 'valid')
  } else if (type === InstallType.Classic) {
    installDirStatusEl.innerText = 'Classic World of Warcraft'
    installDirStatusEl.setAttribute('data-install-status', 'valid')
  } else {
    installDirStatusEl.innerText = 'No World of Warcraft installation detected'
    installDirStatusEl.setAttribute('data-install-status', 'invalid')
  }
})
