<template>
  <div class="main-container">
    <div class="search-form">
      <h1>nantes<small>.cool</small></h1>

      <SearchForm
        ref="searchForm"

        :debug="debug"
        :onFromUpdate="onFromUpdate"

        @focusFromTo="focusFromTo"
        @blurFromTo="blurFromTo"

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
      @click="updateMarker"
      @toggleItinerary="toggleItinerary"
      @updateMarker="updateMarkerFromTo"
      :markers="[startMarker, endMarker]"
      :trips="trips"
    />
  </div>
</template>

<script>

import debounce from 'lodash/debounce';
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
      fromActive: false,
      toActive: false,

      selectedItinerary: 0,

      results: [],
      collapsed: {},

      firstRun: true,
      loading: false,

      from: this.from,
      to: this.to,
      timeParameter: this.timeParameter || 'leaveNow',
      date: new Date(),
      time: `${moment().format('HH')}:${moment().format('mm')}`,
      trips: [],

      startMarker: null,
      endMarker: null,
    };
  },
  methods: {
    updateMarkerFromTo(p, a) {
      if (a === 'from') {
        console.log('update from', p._latlng)
        this.onFromUpdate(p._latlng);
      } else if (a === 'to') {
        this.onToUpdate(p._latlng);
      }
    },
    debug() {
      this.from = '47.20808979999999,-1.5364250000000084';
      this.to = '47.2129612,-1.5623385000000098';
      this.startMarker = {
        id: 'start',
        latlng: L.latlng(47.20808979999999, -1.5364250000000084),
      };
      this.endMarker = {
        id: 'end',
        latlng: L.latlng(47.2129612, -1.5623385000000098),
      };
      this.searchJourneys();
    },
    focusFromTo(fromTo) {
      this[`${fromTo}Active`] = true;
    },
    blurFromTo(fromTo) {
      debounce(() => {
        this[`${fromTo}Active`] = false;
      }, 100)();
    },
    updateMarker(latlng) {
      if (this.fromActive) {
        this.$refs.searchForm.forceCoordinates('from', latlng);
        this.onFromUpdate({
          lng: latlng.lng,
          lat: latlng.lat,
        });
      } else if (this.toActive) {
        this.$refs.searchForm.forceCoordinates('to', latlng);
        this.onToUpdate({
          lng: latlng.lng,
          lat: latlng.lat,
        });
      }
    },
    onChangeDate(value) {
      this.date = value;
    },
    onChangeTime(value) {
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
    onFromUpdate(latlng) {
      this.from = `${latlng.lat},${latlng.lng}`;

      this.startMarker = {
        id: 'from',
        latlng: L.latLng(latlng.lat, latlng.lng),
      };
      this.center = L.latLng(latlng.lat, latlng.lng);

      if (this.to) {
        this.searchJourneys();
      }
    },

    onToUpdate(latlng) {
      this.to = `${latlng.lat},${latlng.lng}`;

      this.endMarker = {
        id: 'to',
        latlng: L.latLng(latlng.lat, latlng.lng),
      };
      this.center = L.latLng(latlng.lat, latlng.lng);

      if (this.from) {
        this.searchJourneys();
      }
    },
    getTrip(itineraryId) {
      const trips = [];
      this.results.forEach((result, resultId) => {
        const isActive = resultId === itineraryId;
        const combinedPolyLines = result.legs.map((leg, index) => {
          const latlngs = polyUtil.decode(leg.legGeometry.points);

          // eslint-disable-next-line
          const color = leg.mode === 'WALK' ? '#3367D6' : (
            leg.routeColor ? `#${leg.routeColor}` : 'green'
          );
          const dashArray = leg.mode === 'WALK' ? '1 12' : null;

          return [
            // outline
            {
              id: `${leg.routeId}${index}${resultId}-outline`,
              weight: 10,
              color: '#424242',
              dashArray,
              latlngs,
              resultId,
            },
            // main polyline
            {
              id: `${leg.routeId}${index}${resultId}`,
              weight: 9,
              color: isActive ? color : '#cccccc',
              dashArray,
              latlngs,
              resultId,
            },
          ];
        });
        combinedPolyLines.forEach((polyLines) => {
          trips.push({
            active: isActive,
            polyLines,
          });
        });
      });


      this.trips = trips.sort(i => i.active);
    },
    /**
    * Call the api for results
    */
    async searchJourneys() {
      if (!this.to || !this.from) {
        return;
      }

      this.trips = [];
      this.results = [];
      this.loading = true;
      this.error = null;
      this.firstRun = false;

      const extras = {};
      if (this.timeParameter === 'leaveNow') {
        extras.date = moment().format('MM-DD-YYYY');
        extras.time = moment().format('HH:mm');
      } else {
        extras.date = moment(this.date).format('MM-DD-YYYY');
        extras.time = moment(this.time, 'HH:mm').format('hh:mma');
      }

      if (this.timeParameter === 'leaveAt' || this.timeParameter === 'leaveNow') {
        extras.arriveBy = 'false';
      } else {
        extras.arriveBy = 'true';
      }

      try {
        const result = await axios.post(`${process.env.API_URL}/trip`, {
          from: this.from,
          to: this.to,
          ...extras,
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
  watch: {
    time() {
      this.searchJourneys();
    },
    date() {
      this.searchJourneys();
    },
    from() {
      this.searchJourneys();
    },
    to() {
      this.searchJourneys();
    },
    timeParameter() {
      this.searchJourneys();
    },
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

  overflow-x: hidden;

  background-color: #ffcfdf;
  background-image: linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%);
}

.results {
  margin-top: 1rem;
}

.legs {
  border-top: 1px solid hsla(0, 0%, 0%, 0.2);
  margin: 0 auto;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .search-form {
    width: 100%;
  }
}

</style>
