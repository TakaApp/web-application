<template>
  <button v-on:click="onClick">
    {{label}}
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: [
    'label',
    'onClick',
  ],
};
</script>

<style scoped>

button {
  padding: .5rem .25rem;
  background-color: #8fcccb;
  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
}

button:focus {
  outline: 0;
}

button:active {
  box-shadow: none;
}


</style>
