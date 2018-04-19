<template>
  <div class="itinerary">
    <div v-on:click="onClick()">
      <JourneySummary
        :itinerary="itinerary"
        :selected="!collapsed"
      />
    </div>
    <div v-if="!collapsed" class="legs">
      <div v-for="(leg, index) in itinerary.legs" v-bind:key="leg.startTime">
        <LegWalk
          v-if="leg.mode === 'WALK'"
          :leg="leg"
          :index="index"
          :last="index === itinerary.legs.length - 1"
          :first="index === 0"
        />
        <LegBus
          v-if="leg.mode === 'BUS'"
          :leg="leg"
          :index="index"
          :last="index === itinerary.legs.length - 1"
          :first="index === 0"
        />
      </div>
    </div>
  </div>
</template>

<script>

import LegWalk from '@/components/LegWalk';
import LegBus from '@/components/LegBus';
import JourneySummary from '@/components/JourneySummary';

export default {
  name: 'Home',
  props: ['itinerary', 'collapsed', 'onClick'],
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    LegWalk,
    LegBus,
    JourneySummary,
  },
};
</script>

<style scoped>

.itinerary {
  font-size: .8rem;

  text-align: center;

  position: relative;

  max-width: 500px;

  margin: 0 auto;
  margin-bottom: .5rem;

  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: #FFF;
}

.legs {
  border-top: 1px solid hsla(0, 0%, 0%, 0.2);
  margin: 0 auto;
  width: 100%;
}

</style>
