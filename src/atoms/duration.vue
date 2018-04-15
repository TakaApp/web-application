<template>
  <div>
    {{duration(data)}}
  </div>
</template>

<script>
export default {
  name: 'Duration',
  props: ['data'],
  methods: {
    duration: (durationInSeconds) => {
      const date = new Date(null);
      date.setSeconds(durationInSeconds);
      return `Durée: ${date.toISOString().substr(11, 5)}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
