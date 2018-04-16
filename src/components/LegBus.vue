<template>
  <div class="leg-container">
    <div class="leg-illustration">
      <div class="start-time"><Hour :data="leg.startTime" /></div>
      <div class="bus">
        <div class="icon"></div>
        <div class="bus-number-container">
          <div
            class="bus-number"
            :style="{
              backgroundColor: `#${leg.routeColor}`,
              color: `#${leg.routeTextColor}`,
              paddingTop: index === 0 ? '2rem' : 0,
              paddingBottom: last ? '2rem' : 0,
            }"
          >
            {{leg.route}}
          </div>
        </div>
      </div>
      <div class="end-time"><Hour :data="leg.endTime" /></div>
    </div>
    <div class="leg-description">
      <div v-if="index === 0" class="leg-description-item">
        <b><Place :data="leg.from" /></b>
      </div>
      <div class="leg-description-item">
        <div><b><Direction :data="leg.headSign" /></b></div>
        <div><Duration :data="leg.duration" /></div>
      </div>
      <div class="leg-description-item">
        <div>{{leg.to.stopSequence - leg.from.stopSequence}} arrêts</div>
      </div>
      <div class="leg-description-item">
        <b><Place :data="leg.to" /></b>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LegBus',
  props: ['leg', 'index', 'last'],
};
</script>

<style scoped>

.start-time {
  font-weight: bolder;
}

.bus {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-self: center;
  justify-content: space-around;
  margin-bottom: .5rem;
}
.bus-number-container {
  flex: 1;
  padding: .5rem;
  min-width: 1.25rem;
}
.bus-number {
  padding: .5rem;
}

.icon {
  flex: 1;
  height: 1.25rem;
  width: 1.25rem;
  background-image: url(../assets/icons/bus.png);
  background-repeat: no-repeat;

  background-size: contain;
  background-position: center center;
  align-self: center;
}
</style>
