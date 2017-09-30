<template>
  <section class="donger-list">
    <a href="#" class="donger-list-item" v-for="(donger, i) in sortedDongers" :key="i" :title="donger.name" @click="handleDongerActivated(donger)">
      {{ donger.body }}
    </a>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ipcRenderer } from 'electron'
import { Donger } from '../../donger'
import { getDongers } from '../../configStore'

type DongerList = {
  dongers: Donger[]
  sortedDongers: Donger[]
  handleDongerActivated: (donger: Donger) => void
  updateDongers: (event: any, dongerList: Donger[]) => void
}

export default {
  data() {
    return {
      dongers: getDongers(),
    }
  },
  created() {
    ipcRenderer.on('update-dongers', this.updateDongers)
  },
  destroyed() {
    ipcRenderer.removeListener('update-dongers', this.updateDongers)
  },
  methods: {
    handleDongerActivated(donger: Donger) {
      ipcRenderer.send('donger-activate', JSON.stringify(donger))
    },
    updateDongers(event: any, dongerList: string) {
      this.dongers = JSON.parse(dongerList)
    },
  },
  computed: {
    sortedDongers() {
      return this.dongers.sort((a, b) => {
        if (a.dateLastUsed !== b.dateLastUsed) {
          return b.dateLastUsed - a.dateLastUsed
        }
        return a.name.localeCompare(b.name)
      })
    }
  },
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
