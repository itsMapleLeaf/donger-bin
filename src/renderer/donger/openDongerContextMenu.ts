import { remote } from "electron"

const { Menu } = remote.require("electron") as typeof Electron

interface DongerMenuOptions {
  onDelete: () => void
}

export function openDongerContextMenu(opts: DongerMenuOptions) {
  const menu = Menu.buildFromTemplate([
    { label: "Delete", click: () => opts.onDelete() },
  ])

  menu.popup({})
}
