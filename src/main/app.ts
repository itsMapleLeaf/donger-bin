import { app, ipcMain, clipboard } from 'electron'
import { createWindow, hideWindow } from './window'
import { createTray } from './tray'

export function init() {
  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080`
      : `file://${__dirname}/index.html`

  app.on('ready', () => {
    createWindow(winURL).on('ready-to-show', () => {
      createTray()
    })

    ipcMain.on('donger-activate', (_, data) => {
      const dongerInfo = JSON.parse(data)
      clipboard.writeText(dongerInfo.body)
      hideWindow()
    })
  })
}
