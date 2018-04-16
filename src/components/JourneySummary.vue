<template>
  <div class="journey-summary">
    <div class="journey-departure">
      <div class="journey-departure-label">Départ dans</div>
      <div class="departure-minutes-left-container">
        <div class="departure-minutes-left">42</div>
        <div>min</div>
      </div>
    </div>
    <div class="journey-details">
      <div class="journey-duration">
        <div>Durée: </div>
        <div class="duration"><Duration :data="itinerary.duration" /></div>
        <div>•</div>
        <div>{{moment(itinerary.endTime).format('HH:mm')}}</div>
      </div>
      <div>{{itinerary.transfers}} changement(s)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JourneySummary',
  props: ['itinerary'],
};
</script>

<style scoped>

.journey-summary {
  background-color: #4c4177;
  background-image: linear-gradient(315deg, #4c4177 0%, #2a5470 74%);

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  color: #FFFFFFFA;

  display: flex;
  flex-direction: row;

  text-align: left;
}

.journey-details {
  flex: 7;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.journey-duration {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.duration {
  color: #cc2936;
  font-weight: bolder;
}

.journey-departure {
  flex: 1;

  text-align: left;
  padding: 1rem;
}

.journey-departure-label {
  font-size: 0.8rem;
}
.departure-minutes-left {
  font-size: 2.5rem;
}
.departure-minutes-left-container {
  display: flex;
  flex-direction: row;

  align-items: baseline;
}

</style>
