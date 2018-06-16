import { app, BrowserWindow, ipcMain, Menu, screen, Tray } from "electron"
import { watch } from "fs"
import { resolve } from "path"

const isDevMode = process.argv.includes("--dev")

process.env.NODE_ENV = isDevMode ? "development" : "production"

function getAssetPath(filename: string) {
  return resolve(__dirname, "../assets", filename)
}

function createWindow() {
  const windowWidth = 600
  const windowHeight = 600
  const displayBounds = screen.getPrimaryDisplay().workArea

  const win = new BrowserWindow({
    frame: isDevMode,
    width: windowWidth,
    height: windowHeight,
    x: displayBounds.width - windowWidth - 10,
    y: displayBounds.height - windowHeight - 10,
  })

  win.loadFile(getAssetPath("index.html"))

  if (!isDevMode) {
    win.on("blur", () => {
      win.hide()
    })
  }

  return win
}

function createTray(win: BrowserWindow) {
  const menu = Menu.buildFromTemplate([
    { label: "Show", click: () => win.show() },
    { role: "quit" },
  ])

  const tray = new Tray(getAssetPath("icon.png"))
  tray.on("click", () => win.show())
  tray.setContextMenu(menu)
  return tray
}

function initDevMode(win: BrowserWindow) {
  win.webContents.openDevTools()
  const reloadWindow = win.webContents.reload.bind(win.webContents)
  watch(resolve(__dirname, "../assets"), { recursive: true }, reloadWindow)
  watch(resolve(__dirname, "./renderer"), { recursive: true }, reloadWindow)
}

function ready() {
  const win = createWindow()

  createTray(win)

  if (isDevMode) {
    initDevMode(win)
  }

  ipcMain.on("donger-context-menu", (event: Electron.Event, arg: any) => {
    const dongerMenu = Menu.buildFromTemplate([
      { label: "Edit" },
      { label: "Delete" },
    ])

    dongerMenu.popup({})
  })
}

app.on("ready", ready)
