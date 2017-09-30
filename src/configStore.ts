import * as ConfigStore from 'configstore'
import { Donger } from './donger'

const meta = require('../package.json')

const defaults = {
  dongers: [
    new Donger('shrug (markdown)', String.raw`¯\\\_(ツ)\_/¯`),
    new Donger('shrug', String.raw`¯\_(ツ)_/¯`),
    new Donger('flower', `(◕‿◕✿)`),
    new Donger('peace', `(⌣‿⌣✿)`),
    new Donger('give', `༼ つ ◕_◕ ༽つ`),
    new Donger('OG', `ヽ༼ຈل͜ຈ༽ﾉ`),
    new Donger('lenny', `( ͡° ͜ʖ ͡°)`),
    new Donger('dance', `ᕕ( ᐛ )ᕗ`),
    new Donger('stars', `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`),
    new Donger('shige', `(´・◡ ・｀)`),
  ],
}

const store = new ConfigStore(meta.name, defaults)

export function getDongers(): Donger[] {
  return store.get('dongers')
}

export function addDonger(donger: Donger) {
  store.set('dongers', getDongers().concat(donger))
}

export function removeDonger(id: string) {
  store.set('dongers', getDongers().filter(d => d.id !== id))
}
