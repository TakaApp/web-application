<template>
  <div class="leg-container">
    <div
      class="leg-illustration"
      :style="{
        paddingTop: first ? '2rem' : 0,
        paddingBottom: last ? '2rem' : 0,
      }"
    >
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
      <div class="line" />
      <div class="end-time"><Hour :data="leg.endTime" /></div>
    </div>
    <div class="leg-description from">
      <div v-if="index === 0" class="leg-description-item">
        <b><Place :data="leg.from" /></b>
      </div>
      <div class="leg-description-item">
        <div>
          <b><Direction :data="leg.headSign" /></b>
          <div class="next-departures">
            Prochains départs:
            <Hour :data="leg.startTime" />
          </div>
        </div>
        <div><Duration :data="leg.duration" /></div>
      </div>

      <div class="leg-description-item stops">
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
  props: ['leg', 'index', 'last', 'first'],
};
</script>

<style scoped>

.line:after {
  content: '';
  height: 12px;
  width: 12px;
  border-radius: 50%;

  background: #dbdbdb;
  position: absolute;
  margin-top: 4px;
  bottom: -10px;
  left: -6px;
}
.line {
  position: relative;
  width: 0;
  border: 1px solid #dbdbdb;
  flex-grow: 1;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.from {
  padding-top: .25rem;
}
.next-departures {
  font-size: .9rem;
  padding-left: 1.25rem;
}

.bus {
  width: 100%;
  display: flex;
  flex-direction: row;

  align-self: flex-start;

  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: .6rem;
}
.bus-number-container {
  min-width: 1.25rem;
  margin-left: 2px;
}
.bus-number {
  margin-right: .5rem;
  padding: .5rem;
  line-height: 1rem;
  width: 1.25rem;
}

.stops {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.icon {
  margin-right: 2px;
  height: 1.25rem;
  background-image: url(../assets/icons/bus.png);
  background-repeat: no-repeat;

  background-size: contain;
  background-position: center center;
  align-self: center;
  width: 1.25rem;
}
</style>
