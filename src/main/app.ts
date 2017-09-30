import { app, ipcMain, clipboard } from 'electron'
import { createWindow, hideWindow } from './window'
import { createTray } from './tray'
import { Donger } from '../donger'

export function init() {
  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080`
      : `file://${__dirname}/index.html`

  app.on('ready', () => {
    createWindow(winURL).on('ready-to-show', () => {
      createTray()
    })

    ipcMain.on('donger-activate', (event: Event, data: string) => {
      const dongerInfo = JSON.parse(data) as Donger
      clipboard.writeText(dongerInfo.body)
      hideWindow()
    })
  })
}
