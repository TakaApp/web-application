<template>
  <span>
    {{format(data)}}
  </span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Hour',
  props: ['data'],
  methods: {
    format: (timestamp) => {
      return `${moment(timestamp).format('HH:mm')}`;
    },
  },
};
</script>

<style scoped>
</style>
