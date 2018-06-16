import { resolve } from "path"
import { DongerData } from "./DongerData"
import { Storage } from "./storage"

const userFolder =
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? resolve(process.env.HOME!, "Library/Preferences")
    : resolve(process.env.HOME!, ".local/share"))

const savePath = resolve(userFolder, "donger-bin/dongers.json")

interface StoredDongers {
  dongers: DongerData[]
}

const defaultDongers = {
  dongers: [
    { id: "shrug", body: String.raw`¯\_(ツ)_/¯` },
    { id: "shrug (markdown)", body: String.raw`¯\\\_(ツ)\_/¯` },
    { id: "flower", body: `(◕‿◕✿)` },
    { id: "peace", body: `(⌣‿⌣✿)` },
    { id: "give", body: `༼ つ ◕_◕ ༽つ` },
    { id: "OG", body: `ヽ༼ຈل͜ຈ༽ﾉ` },
    { id: "lenny", body: `( ͡° ͜ʖ ͡°)` },
    { id: "lenny (drugs)", body: "( ͡☉ ͜ʖ ͡☉)" },
    { id: "dance", body: `ᕕ( ᐛ )ᕗ` },
    { id: "stars", body: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧` },
    { id: "shige", body: `(´・◡ ・｀)` },
  ],
}

export const dongerStorage = new Storage<StoredDongers>(
  defaultDongers,
  savePath,
)
