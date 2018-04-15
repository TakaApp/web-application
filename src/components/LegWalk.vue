<template>
  <div class="leg-container">
    <div class="leg-illustration">
      <div class="start-time"><Hour :data="leg.startTime" /></div>
      <div class="icon"></div>
      <div class="dot">•</div>
      <div class="dot">•</div>
      <div class="dot mb">•</div>
      <div class="end-time"><Hour :data="leg.endTime" /></div>
    </div>
    <div class="leg-description">
      <div>Marcher <Duration :data="leg.duration" /></div>
      <div><Distance :data="leg.distance" /></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LegWalk',
  props: ['leg'],
};
</script>

<style scoped>

.start-time {
  color: #cc2936;
  font-weight: bolder;
}

.mb {
  margin-bottom: .4rem;
}
.dot {
  line-height: .5rem;
  font-size: 0.8rem;
}

.icon {
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  background-image: url(../assets/icons/walk.png);
  margin-top: .5rem;
  margin-bottom: .5rem;
  background-size: contain;
}
</style>
