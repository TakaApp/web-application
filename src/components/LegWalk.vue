<template>
  <div class="leg-container">
    <div
      class="leg-illustration"
      :style="{
        paddingTop: index === 0 ? '2rem' : 0,
        paddingBottom: last ? '2rem' : 0,
      }"
    >
      <div  v-if="index === 0" class="start-time"><Hour :data="leg.startTime" /></div>
      <div class="icon"></div>
      <div class="dot">•</div>
      <div class="dot">•</div>
      <div class="dot mb">•</div>
      <div class="end-time"><Hour :data="leg.endTime" /></div>
    </div>
    <div
      class="leg-description"
      :style="{
        paddingTop: index === 0 ? '2rem' : 0,
        paddingBottom: last ? '2rem' : 0,
      }"
    >
      <div class="leg-description-item">
        <b v-if="index === 0"><Place :data="leg.from" /></b>
      </div>
      <div class="leg-description-item">
        <div>Marcher <Distance :data="leg.distance" /></div>
        <div><Duration :data="leg.duration" /></div>
      </div>
      <div class="leg-description-item">
        <b><Place :data="leg.to" /></b>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LegWalk',
  props: ['leg', 'index', 'last'],
};
</script>

<style scoped>

.start-time {
  color: #59C9A5;
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
