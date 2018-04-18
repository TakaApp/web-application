<template>
  <div class="main-container">
    <div class="search-form">
      <h1>nantes<small>.cool</small></h1>
      <SearchForm
        :onSearch="searchJourneys"
        :onFromUpdate="onFromUpdate"
        :onToUpdate="onToUpdate"
      />
      <p>Nombre de résultats : {{this.results.length}}</p>
      <div v-for="itinerary in this.results" class="itinerary">
        <JourneySummary :itinerary="itinerary" />
        <div class="legs">
          <div v-for="(leg, index) in itinerary.legs">
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
    </div>
    <div class="map">
      <l-map ref="map" style="height: 100vh" :zoom="zoom" v-bind:center="center">
        <l-tile-layer :url="url"></l-tile-layer>

        <l-marker v-if="!!startMarker" v-bind:lat-lng="startMarker"></l-marker>
        <l-marker v-if="!!endMarker" v-bind:lat-lng="endMarker"></l-marker>
      </l-map>
    </div>

  </div>
</template>

<script>

import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import axios from 'axios';
import moment from 'moment';

import SearchForm from '@/organisms/SearchForm';

import LegWalk from '@/components/LegWalk';
import LegBus from '@/components/LegBus';

import JourneySummary from '@/components/JourneySummary';

export default {
  name: 'Home',
  data() {
    return {
      results: [],

      from: this.from,
      to: this.to,


      center: this.center || L.latLng(47.209136, -1.547149),


      startMarker: null,
      endMarker: null,

      // map style
      url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      // seems like a good value
      zoom: 13,
      // because we support the community
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
    };
  },
  methods: {

    onFromUpdate(latLng) {
      this.from = `${latLng.latitude},${latLng.longitude}`;

      const leafletObject = L.latLng(latLng.latitude, latLng.longitude);
      this.startMarker = leafletObject;
      this.center = leafletObject;
    },
    onToUpdate(latLng) {
      this.to = `${latLng.latitude},${latLng.longitude}`;

      const leafletObject = L.latLng(latLng.latitude, latLng.longitude);
      this.endMarker = leafletObject;
      this.center = leafletObject;
    },
    /**
    * Call the api for results
    */
    async searchJourneys() {
      const result = await axios.post('http://localhost:1323/trip', {
        from: this.from || '47.20808979999999,-1.5364250000000084',
        to: this.to || '47.2129612,-1.5623385000000098',
        leaveAt: moment().add(15, 'minutes').format('HH:mm'),
        date: moment().format('MM-DD-YYYY'),
      });

      this.results = result.data.plan.itineraries || [];
    },
  },
  components: {
    LegWalk,
    LegBus,
    JourneySummary,

    SearchForm,

    LMap,
    LTileLayer,
    LMarker,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 2rem;
  margin: .5rem 0;
}
small {
  font-size: 1rem;
}

.main-container {
  display: flex;
}

.search-form {
  flex: 2;
  height: 100vh;

  overflow-y: scroll;
}

.map {
  background-color: #FFF;
  height: 100vh;
  flex: 3;
  overflow-x: auto;
}

.itinerary {
  text-align: center;

  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 2rem;

  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 4px;
  background-color: #FFF;
}

.legs {
  border-top: 1px solid hsla(0, 0%, 0%, 0.2);
  margin: 0 auto;
  width: 100%;
}

.address-input {
  min-width: 250px;
}

</style>