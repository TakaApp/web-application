<template>
  <div class="main-container">
    <div class="search-form">
      <h1>nantes<small>.cool</small></h1>

      <SearchForm
        :debug="debug"
        :onFromUpdate="onFromUpdate"
        :onToUpdate="onToUpdate"

        :timeParameter="timeParameter"
        v-on:onChangeTimeParameter="onChangeTimeParameter"

        :date="date"
        v-on:onChangeDate="onChangeDate"

        :time="time"
        v-on:onChangeTime="onChangeTime"
      />
      <div v-if="loading"><small>Chargement...</small></div>
      <div class="results" v-if="!loading && !firstRun">
        <p v-if="results.length === 0">Aucun résultat (ง'̀-'́)ง</p>

        <Itinerary
          v-for="(itinerary, index) in results"
          :key="index"
          :itinerary="itinerary"
          v-bind:collapsed="collapsed[index]"
          :onClick="() => toggleItinerary(index)"
        />
      </div>
    </div>

    <Map
      :markers="[startMarker, endMarker]"
      :trip="trip"
    />
  </div>
</template>

<script>

import L from 'leaflet';
import polyUtil from 'polyline-encoded';

import axios from 'axios';
import moment from 'moment';

import SearchForm from '@/organisms/SearchForm';
import Map from '@/organisms/Map';
import Itinerary from '@/organisms/Itinerary';

import LegWalk from '@/components/LegWalk';
import LegBus from '@/components/LegBus';
import JourneySummary from '@/components/JourneySummary';


export default {
  name: 'Home',
  data() {
    return {
      selectedItinerary: 0,

      results: [],
      collapsed: {},

      firstRun: true,
      loading: false,

      from: this.from,
      to: this.to,
      timeParameter: this.timeParameter || 'leaveAt',
      date: new Date(),
      time: `${moment().get('hour')}:${moment().get('minutes')}`,
      trip: [],

      startMarker: null,
      endMarker: null,
    };
  },
  methods: {
    debug() {
      this.from = '47.20808979999999,-1.5364250000000084';
      this.to = '47.2129612,-1.5623385000000098';
      this.startMarker = {
        id: 'start',
        latLng: L.latLng(47.20808979999999, -1.5364250000000084),
      };
      this.endMarker = {
        id: 'end',
        latLng: L.latLng(47.2129612, -1.5623385000000098),
      };
      this.searchJourneys();
    },
    onChangeDate(value) {
      this.date = value;
    },
    onChangeTime(value) {
      console.log('onchangetime', value);
      this.time = value;
    },
    onChangeTimeParameter(value) {
      this.timeParameter = value;
      if (this.to && this.from && value === 'leaveNow') {
        this.searchJourneys();
      }
    },
    toggleItinerary(index) {
      const newCollapsedState = {};
      const newState = !this.collapsed[index];
      Object.keys(this.collapsed).forEach((key) => {
        newCollapsedState[key] = true;
      });
      newCollapsedState[index] = newState;
      this.collapsed = newCollapsedState;

      if (!newState) {
        this.getTrip(index);
      } else {
        this.getTrip(-1);
      }
    },
    onFromUpdate(latLng) {
      this.from = `${latLng.latitude},${latLng.longitude}`;

      this.startMarker = {
        id: 'start',
        latLng: L.latLng(latLng.latitude, latLng.longitude),
      };
      this.center = L.latLng(latLng.latitude, latLng.longitude);

      if (this.to) {
        this.searchJourneys();
      }
    },
    onToUpdate(latLng) {
      this.to = `${latLng.latitude},${latLng.longitude}`;

      this.endMarker = {
        id: 'end',
        latLng: L.latLng(latLng.latitude, latLng.longitude),
      };
      this.center = L.latLng(latLng.latitude, latLng.longitude);

      if (this.from) {
        this.searchJourneys();
      }
    },
    getTrip(itineraryId) {
      if (itineraryId === -1) {
        this.trip = [];
        return;
      }
      const legs = this.results[itineraryId].legs;
      const polyLines = legs.map((leg, index) => {
        const latlngs = polyUtil.decode(leg.legGeometry.points);

        // eslint-disable-next-line
        const color = leg.mode === 'WALK' ? '#3367D6' : (
          leg.routeColor ? `#${leg.routeColor}` : 'green'
        );
        const dashArray = leg.mode === 'WALK' ? '1 12' : null;

        return {
          id: `${leg.routeId}${index}`,
          color,
          dashArray,
          latlngs,
        };
      });
      this.trip = polyLines;
    },
    /**
    * Call the api for results
    */
    async searchJourneys() {
      this.trip = [];
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

        this.results = result.data.plan.itineraries || [];
        this.getTrip(0);

        this.collapsed = {};
        Object.keys(this.results).forEach((key) => {
          this.collapsed[key] = true;
        });
        this.collapsed[0] = false;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  components: {
    Itinerary,

    LegWalk,
    LegBus,
    JourneySummary,

    SearchForm,
    Map,
  },
};
</script>

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
  width: 408px;
  height: 100vh;

  overflow-y: scroll;
}

.results {
  margin-top: 1rem;
}

.legs {
  border-top: 1px solid hsla(0, 0%, 0%, 0.2);
  margin: 0 auto;
  width: 100%;
}

</style>
