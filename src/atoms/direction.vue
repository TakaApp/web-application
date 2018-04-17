<template>
  <div class="direction-container">
    <div class="icon"></div>
    <div class="text-container">
      <p>{{data}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Direction',
  props: ['data'],
};
</script>

<style scoped>

  .text-container {
    padding-top: 4px;
  }
  .text-container p {
    margin: 0;
  }

  .direction-container {
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    line-height: 1.5em;
    height: 1.5em;
  }

  .icon {
    width: .7rem;
    background-image: url(../assets/icons/direction.png);
    background-repeat: no-repeat;

    background-size: contain;
    background-position: center center;

    margin-right: .5rem;

    height: 1.5em;
  }

</style>
