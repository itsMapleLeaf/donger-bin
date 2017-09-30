// @ts-check
import * as electron from 'electron'

let mainWindow: electron.BrowserWindow

export const windowWidth = 600
export const windowHeight = 600

export function createWindow(winURL: string) {
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

  mainWindow.on('blur', hideWindow)

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
