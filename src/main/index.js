import { app, BrowserWindow, Tray } from 'electron'
import * as fs from 'fs'
import { resolve } from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

/** @type {BrowserWindow} */
let mainWindow

/** @type {Tray} */
let tray

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

app.on('ready', () => {
  const windowWidth = 600
  const windowHeight = 600
  const {workArea} = require('electron').screen.getPrimaryDisplay()

  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    width: windowWidth,
    height: windowHeight,
    x: workArea.width - windowWidth - 10,
    y: workArea.height - windowHeight - 10,
    alwaysOnTop: true,
    resizable: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('ready-to-show', () => {
    tray = new Tray(resolve(__static, 'icon.png'))

    function toggleWindow() {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    }

    tray.on('click', toggleWindow)
    tray.on('double-click', toggleWindow)
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
