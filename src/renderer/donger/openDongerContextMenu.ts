import { remote } from "electron"

const { Menu } = remote.require("electron") as typeof import("electron")

type DongerMenuResult = "delete" | undefined

export function openDongerContextMenu(): Promise<DongerMenuResult> {
  return new Promise((resolve) => {
    const menu = Menu.buildFromTemplate([
      { label: "Delete", click: () => resolve("delete") },
    ])

    menu.popup({
      callback: () => resolve(),
    })
  })
}
