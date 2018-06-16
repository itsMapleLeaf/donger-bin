import { app, ipcMain, clipboard } from 'electron'
import { createWindow, hideWindow } from './window'
import { createTray } from './tray'
import { Donger } from '../donger'
import { updateLastUsed, getDongers } from '../configStore'

export function init() {
  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080`
      : `file://${__dirname}/index.html`

  app.on('ready', () => {
    createWindow(winURL).on('ready-to-show', () => {
      createTray()
    })

    ipcMain.on('donger-activate', (event: Electron.IpcMessageEvent, data: string) => {
      const donger = JSON.parse(data) as Donger
      clipboard.writeText(donger.body)
      updateLastUsed(donger.id, Date.now())
      hideWindow()
      event.sender.send('update-dongers', JSON.stringify(getDongers()))
    })
  })
}
