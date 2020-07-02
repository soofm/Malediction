import React from 'react'
import { Api, InstallType, InstallDirectory } from '../common'

interface IState {
  path: string
  installStatus: string
  installText: string
}

export class App extends React.Component<{}, IState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      path: '',
      installStatus: '',
      installText: ''
    }
  }

  render (): React.ReactNode {
    return (
      <div className="container">
        <input type="text" id="install-dir-input" placeholder="Select install directory" onClick={this.sendSelectInstallDirectoryMessage} />
        <div id="install-dir-status" data-install-status={this.state.installStatus}>{this.state.installText}</div>
      </div>
    )
  }

  componentDidMount (): void {
    // eslint-ignore-next-line
    const api = (window as any).api as Api
    api.on('select-install-directory-reply', (data: InstallDirectory) => this.receiveSelectInstallDirectoryMessage(data))
  }

  sendSelectInstallDirectoryMessage (): void {
    // eslint-ignore-next-line
    const api = (window as any).api as Api
    api.send('select-install-directory-message', null)
  }

  receiveSelectInstallDirectoryMessage (data: InstallDirectory): void {
    const { type, path } = data
    let installText: string, installStatus: string
    if (type === InstallType.Retail) {
      installText = 'Retail World of Warcraft'
      installStatus = 'valid'
    } else if (type === InstallType.Classic) {
      installText = 'Classic World of Warcraft'
      installStatus = 'valid'
    } else {
      installText = 'No World of Warcraft installation detected'
      installStatus = 'invalid'
    }
    this.setState({ path, installStatus, installText })
  }
}
