<template>
  <section class="donger-list">
    <a href="#" class="donger-list-item" v-for="(donger, i) in dongers" :key="i" @click="handleDongerActivated(donger)">
      {{ donger.body }}
    </a>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ipcRenderer } from 'electron'
import { Donger } from '../../donger'

type DongerList = {
  dongers: Donger[]
  handleDongerActivated: (donger: Donger) => void
}

export default {
  data() {
    return {
      dongers: [
        { name: 'shrug', body: String.raw`¯\_(ツ)_/¯` },
        { name: 'shrug (markdown)', body: String.raw`¯\\\_(ツ)\_/¯` },
        { name: 'flower', body: `(◕‿◕✿)` },
        { name: 'peace', body: `(⌣‿⌣✿)` },
        { name: 'give', body: `༼ つ ◕_◕ ༽つ` },
        { name: 'OG', body: `ヽ༼ຈل͜ຈ༽ﾉ` },
        { name: 'lenny', body: `( ͡° ͜ʖ ͡°)` },
        { name: 'dance', body: `ᕕ( ᐛ )ᕗ` },
        { name: 'stars', body: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧` },
        { name: 'shige', body: `(´・◡ ・｀)` },
      ] as Donger[]
    }
  },
  methods: {
    handleDongerActivated(donger: Donger) {
      ipcRenderer.send('donger-activate', JSON.stringify(donger))
    }
  }
} as Vue.ComponentOptions<Vue & DongerList>
</script>

<style scoped>
.donger-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  --list-spacing: 0.5rem;

  padding: calc(var(--list-spacing) / 2);
}

.donger-list-item {
  margin: calc(var(--list-spacing) / 2);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 250px;
  height: 80px;

  transition: var(--default-transition);

  background-color: var(--bg-darken-1);
}

.donger-list-item:hover {
  background-color: var(--bg-darken-2);
}
</style>
