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
            }"
          >
            {{leg.route}}
          </div>
        </div>
      </div>
      <div class="end-time"><Hour :data="leg.endTime" /></div>
    </div>
    <div class="description">
      <div class="leg-description">
        <div>> {{leg.headSign}}</div>
        <div><Duration :data="leg.duration" /></div>
      </div>
      <div class="leg-description">
        <div>{{leg.to.stopSequence - leg.from.stopSequence}} arrêts</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LegBus',
  props: ['leg'],
};
</script>

<style scoped>

.start-time {
  color: #cc2936;
  font-weight: bolder;
}

.description {
  flex: 7;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding-left: 1rem;
  padding-right: 1rem;
}
.leg-description {
  flex: 1;
  border: none;
  padding-left: 0;
  padding-right: 0;
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
