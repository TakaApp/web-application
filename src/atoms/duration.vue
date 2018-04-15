<template>
  <span>
    {{duration(data)}}
  </span>
</template>

<script>
export default {
  name: 'Duration',
  props: ['data'],
  methods: {
    duration: (durationInSeconds) => {
      const date = new Date(null);
      date.setSeconds(durationInSeconds);
      if (durationInSeconds <= 60 * 59) {
         return `${date.toISOString().substr(14, 2)}min`;
      }
      return `${date.toISOString().substr(11, 5)}min`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
