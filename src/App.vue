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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  border: 1px solid black;
}
.leg-description {
  flex: 7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;

  padding-left: 1rem;
  padding-right: 1rem;
}
.leg-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
