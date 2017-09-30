// @ts-check
import * as electron from 'electron'

/** @type {electron.BrowserWindow} */
let mainWindow

export const windowWidth = 600
export const windowHeight = 600

/**
 * @param {string} winURL
 */
export function createWindow(winURL) {
  const { workArea } = require('electron').screen.getPrimaryDisplay()

  mainWindow = new electron.BrowserWindow({
    show: false,
    frame: false,
    width: windowWidth,
    height: windowHeight,
    x: workArea.width - windowWidth - 10,
    y: workArea.height - windowHeight - 10,
    alwaysOnTop: true,
    resizable: false,
  })

  mainWindow.loadURL(winURL)

  return mainWindow
}

export function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

export function showWindow() {
  mainWindow.show()
}

export function hideWindow() {
  mainWindow.hide()
}
