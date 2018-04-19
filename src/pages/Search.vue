<template>
  <div class="main-container">
    <div class="search-form">
      <h1>nantes<small>.cool</small></h1>
      <SearchForm
        :onSearch="searchJourneys"
        :onFromUpdate="onFromUpdate"
        :onToUpdate="onToUpdate"
      />
      <div v-if="loading"><small>Chargement...</small></div>
      <div v-if="!loading && !firstRun">
        <p>Nombre de résultats : {{results.length}}</p>

        <div v-for="(itinerary, index) in results" v-bind:key="index" class="itinerary">
          <JourneySummary :itinerary="itinerary" />
          <div class="legs">
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
      </div>
    </div>
    <div class="map">
      <l-map ref="map" style="height: 100vh" :zoom.sync="zoom" :center.sync="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-polyline
          v-for="step in trip"
          v-bind:key="step.id"
          :lat-lngs="step.latlngs"
          :color="step.color"
          :weight="7"
        />

        <l-marker v-if="!!startMarker" :lat-lng="startMarker" :draggable="false" />
        <l-marker v-if="!!endMarker" :lat-lng="endMarker" :draggable="false" />
      </l-map>
    </div>

  </div>
</template>

<script>

import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

import axios from 'axios';
import moment from 'moment';

import SearchForm from '@/organisms/SearchForm';

import LegWalk from '@/components/LegWalk';
import LegBus from '@/components/LegBus';

import JourneySummary from '@/components/JourneySummary';

import polyUtil from 'polyline-encoded';


export default {
  name: 'Home',
  data() {
    return {
      selectedItinerary: 0,
      results: [],

      firstRun: true,
      loading: false,
      from: this.from,
      to: this.to,


      center: this.center || L.latLng(47.209136, -1.547149),
      trip: [],

      startMarker: null,
      endMarker: null,

      // map style
      url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      // seems like a good value
      zoom: this.zoom || 13,
      // because we support the community
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
    };
  },
  methods: {

    onFromUpdate(latLng) {
      this.from = `${latLng.latitude},${latLng.longitude}`;

      this.startMarker = L.latLng(latLng.latitude, latLng.longitude);
      this.center = L.latLng(latLng.latitude, latLng.longitude);
    },
    onToUpdate(latLng) {
      this.to = `${latLng.latitude},${latLng.longitude}`;

      this.endMarker = L.latLng(latLng.latitude, latLng.longitude);
      this.center = L.latLng(latLng.latitude, latLng.longitude);
    },
    /**
    * Call the api for results
    */
    async searchJourneys() {
      this.results = [];
      this.loading = true;
      this.error = null;
      this.firstRun = false;

      try {
        const result = await axios.post(`${process.env.API_URL}/trip`, {
          from: this.from || '47.20808979999999,-1.5364250000000084',
          to: this.to || '47.2129612,-1.5623385000000098',
          leaveAt: moment().add(15, 'minutes').format('HH:mm'),
          date: moment().format('MM-DD-YYYY'),
        });
        const legs = result.data.plan.itineraries[this.selectedItinerary].legs;
        const polyLines = legs.map((leg, index) => {
          const latlngs = polyUtil.decode(leg.legGeometry.points);
          return {
            id: `${leg.routeId}${index}`,
            color: leg.routeColor ? `#${leg.routeColor}` : 'green',
            latlngs,
          };
        });
        this.trip = polyLines;

        this.results = result.data.plan.itineraries || [];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
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
    LPolyline,
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
