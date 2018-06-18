import { resolve } from "path"
import { Storage } from "../fs/Storage"
import { DongerData } from "./DongerData"

const userFolder =
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? resolve(process.env.HOME!, "Library/Preferences")
    : resolve(process.env.HOME!, ".local/share"))

const savePath = resolve(userFolder, "donger-bin/dongers.json")

interface StoredDongers {
  dongers: DongerData[]
  lastUsed: string[]
}

const defaultStoredDongers: StoredDongers = {
  dongers: [
    new DongerData("shrug", String.raw`¯\_(ツ)_/¯`),
    new DongerData("shrug (markdown)", String.raw`¯\\\_(ツ)\_/¯`),
    new DongerData("flower", `(◕‿◕✿)`),
    new DongerData("peace", `(⌣‿⌣✿)`),
    new DongerData("give", `༼ つ ◕_◕ ༽つ`),
    new DongerData("OG", `ヽ༼ຈل͜ຈ༽ﾉ`),
    new DongerData("lenny", `( ͡° ͜ʖ ͡°)`),
    new DongerData("lenny (drugs)", "( ͡☉ ͜ʖ ͡☉)"),
    new DongerData("dance", `ᕕ( ᐛ )ᕗ`),
    new DongerData("stars", `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`),
    new DongerData("shige", `(´・◡ ・｀)`),
  ],
  lastUsed: [],
}

export const dongerStorage = new Storage<StoredDongers>(
  defaultStoredDongers,
  savePath,
)
