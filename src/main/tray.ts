// @ts-check
import { app, Tray, Menu } from 'electron'
import { resolve } from 'path'
import { toggleWindow, showWindow } from './window'

declare var __static: string

let tray: Tray

export function createTray() {
  const menu = Menu.buildFromTemplate([
    { label: 'Show', click: showWindow },
    { type: 'separator' },
    { label: 'Exit', click: () => app.quit() },
  ])

  tray = new Tray(resolve(__static, 'icon.png'))
  tray.on('click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.setContextMenu(menu)
}
