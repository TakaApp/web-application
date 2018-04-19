<template>
  <button v-on:click="onClick">
    {{label}}
  </button>
</template>

<script>
export default {
  name: 'Button',
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
}

</style>
