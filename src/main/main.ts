import { app, BrowserWindow, Menu, nativeImage, screen, Tray } from "electron"
import { resolve } from "path"

const isDevMode = process.argv.includes("--dev")

function getAssetPath(filename: string) {
  return resolve(__dirname, "../../assets", filename)
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
  win.setIcon(nativeImage.createFromPath(getAssetPath("icon.png")))

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

function main() {
  let win: BrowserWindow | null
  let tray: Tray | null

  app.on("ready", () => {
    win = createWindow()
    tray = createTray(win)
  })

  app.on("will-quit", () => {
    win = null
    tray = null
  })
}

main()
