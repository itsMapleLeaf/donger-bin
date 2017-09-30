<template>
  <main>
    <header>
      <h1>
        Choose your donger wisely.
        <span style="font-family: sans-serif; display: inline-block">( ͡° ͜ʖ ͡°)</span>
      </h1>
    </header>
    <donger-list></donger-list>
  </main>
</template>

<script>
import DongerList from '@/components/DongerList.vue'

export default {
  components: {
    DongerList
  }
}
</script>

<style scoped>
header {
  text-align: center;
  padding: 1rem;
  opacity: 0.5;
}
</style>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;

  background-color: hsl(0, 0%, 10%);
  color: hsl(0, 0%, 90%);

  --default-transition: 0.2s;
  --bg-darken-1: rgba(0, 0, 0, 0.1);
  --bg-darken-2: rgba(0, 0, 0, 0.3);
  --bg-darken-3: rgba(0, 0, 0, 0.5);
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Condensed';
  font-weight: 300;
}
</style>
