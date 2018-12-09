<template>
  <div class="journey-summary" v-bind:class="{ selected }">
    <div class="journey-departure">
      <div v-if="getMinutesLeftBeforeStart() <= 90" class="journey-departure-label">Départ dans</div>
      <div v-if="getMinutesLeftBeforeStart() <= 90" class="departure-minutes-left-container">
        <div class="departure-minutes-left">{{getMinutesLeftBeforeStart()}}</div>
        <div>min</div>
      </div>
      <div v-if="getMinutesLeftBeforeStart() > 90" class="departure-minutes-left">
        <div>{{moment(itinerary.startTime).format('HH:mm')}}</div>
      </div>
    </div>
    <div class="journey-details">
      <div class="journey-timestamps">
        <div class="journey-start-n-end-time">
          <div>{{moment(itinerary.startTime).format('HH:mm')}}</div>
          <div>&nbsp;—&nbsp;</div>
          <div>{{moment(itinerary.endTime).format('HH:mm')}}</div>
        </div>
        <div class="duration">
          <Duration :data="itinerary.duration"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JourneySummary',
  props: ['itinerary', 'selected'],
  methods: {
    getMinutesLeftBeforeStart() {
      const diffInMs = Math.abs(
        new Date() - new Date(this.itinerary.startTime),
      );
      const diffInS = Math.round(diffInMs / 1000 / 60);
      return diffInS;
    },
  },
};
</script>

<style scoped>
.journey-start-n-end-time {
  display: flex;
}

.journey-summary {
  background-color: #4c4177;
  background-image: linear-gradient(315deg, #4c4177 0%, #2a5470 74%);

  color: #fffffffa;

  display: flex;
  flex-direction: row;

  text-align: left;

  cursor: pointer;
}

.selected {
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
}

.journey-details {
  flex: 7;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.journey-timestamps {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.journee-duration-label {
  margin-right: 0.5rem;
}

.dot {
  margin: 0 0.5rem;
}

.duration {
  font-weight: bolder;
}

.journey-departure {
  flex: 1;

  text-align: left;
  padding: 1rem;
}

.journey-departure-label {
  font-size: 0.5rem;
}
.departure-minutes-left {
  font-size: 2rem;
  font-weight: bolder;
}
.departure-minutes-left-container {
  display: flex;
  flex-direction: row;

  align-items: baseline;
}
</style>
