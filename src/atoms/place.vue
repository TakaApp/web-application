<template>
  <span>
    {{name(data)}}
  </span>
</template>

<script>
export default {
  name: 'Place',
  props: ['data'],
  methods: {
    name: (data) => {
      if (data.name.toLowerCase() === 'origin') {
        return 'Point de départ';
      }
      return data.name;
    },
  },
};
</script>

<style scoped>
</style>
