<template>
  <div class="place-container">
    <div class="icon"></div>
    <div>{{data}}</div>
  </div>
</template>

<script>
export default {
  name: 'Direction',
  props: ['data'],
};
</script>

<style scoped>

  .direction-container {
    display: flex;
    flex-direction: row;
  }

  .icon {
    height: .85rem;
    width: .85rem;
    background-image: url(../assets/icons/direction.png);
    background-repeat: no-repeat;

    background-size: contain;
    background-position: center center;
    align-self: center;

    margin-right: .5rem;
  }

</style>
