import { remote } from "electron"

const { Menu } = remote.require("electron") as typeof import("electron")

export interface DongerContextMenuOptions {
  onDelete: () => void
}

export function openDongerContextMenu(options: DongerContextMenuOptions) {
  const dongerMenu = Menu.buildFromTemplate([
    { label: "Delete", click: options.onDelete },
  ])

  dongerMenu.popup({})
}
