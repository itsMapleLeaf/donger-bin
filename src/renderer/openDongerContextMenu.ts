import { remote } from "electron"

const { Menu } = remote.require("electron") as typeof import("electron")

export function openDongerContextMenu() {
  const dongerMenu = Menu.buildFromTemplate([{ label: "Delete" }])

  dongerMenu.popup({})
}
