// @ts-check
import { app, BrowserWindow, Tray, ipcMain as ipc, clipboard } from 'electron'
import * as fs from 'fs'
import { resolve } from 'path'
import { createWindow, hideWindow } from './window'
import { createTray } from './tray'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

/** @type {Tray} */
let tray

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

app.on('ready', () => {
  createWindow(winURL).on('ready-to-show', () => {
    createTray()
  })

  ipc.on('donger-activate', (_, data) => {
    const dongerInfo = JSON.parse(data)
    clipboard.writeText(dongerInfo.body)
    hideWindow()
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
