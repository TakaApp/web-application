<template>
  <span>
    {{distance(data)}}
  </span>
</template>

<script>
export default {
  name: 'Distance',
  props: ['data'],
  methods: {
    distance: distanceInMeters => `${Math.round(distanceInMeters)}m`,
  },
};
</script>

<style scoped>
</style>
