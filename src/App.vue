<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

* {
  font-family: 'Comfortaa', cursive !important;
}

/* fancy scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
html, body {
  background-color: #fafafa;
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #424242;
}

.leg-illustration {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid hsla(0, 0%, 0%, 0.2);
}
.leg-description {
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding-left: 1rem;
  padding-right: 1rem;
}
.leg-description-item {
  width: 100%;
  text-align: left;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.leg-description-item .duration {
  color: #4c4177;
}

.leg-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
