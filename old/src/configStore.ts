import ConfigStore from "configstore"
import defaultDongers from "./defaultDongers"
import { Donger } from "./donger"

const meta = require("../package.json")

const store = new ConfigStore(meta.name, defaultDongers())

export function getDongers(): Donger[] {
  return store.get("dongers")
}

export function addDonger(donger: Donger) {
  store.set("dongers", getDongers().concat(donger))
}

export function removeDonger(id: string) {
  store.set("dongers", getDongers().filter(d => d.id !== id))
}

export function updateLastUsed(id: string, date: number) {
  const dongerList = getDongers()
  const donger = dongerList.find(d => d.id === id)
  if (donger) {
    donger.dateLastUsed = date
    store.set("dongers", dongerList)
  }
}
