// @ts-check
import { Tray } from 'electron'
import { resolve } from 'path'
import { toggleWindow } from './window'

/** @type {Tray} */
let tray

export function createTray() {
  tray = new Tray(resolve(__static, 'icon.png'))

  tray.on('click', toggleWindow)
  tray.on('double-click', toggleWindow)
}
