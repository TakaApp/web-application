<template>
  <div class="hello">
    <h2>Taka</h2>
    <vue-google-autocomplete
      id="from"
      :enable-geolocation="true"
      :country="['fr']"
      classname="address-input"
      placeholder="Départ"
      v-on:placechanged="getAddressData"
    >
    </vue-google-autocomplete>
    <vue-google-autocomplete
      id="to"
      :enable-geolocation="true"
      :country="['fr']"
      classname="address-input"
      placeholder="Arrivée"
      v-on:placechanged="getAddressData"
    >
    </vue-google-autocomplete>
    <button v-on:click="searchJourneys">
      go
    </button>

    <div>
      <p>Nombre de résultats : {{this.results.length}}</p>
      <div v-for="itinerary in this.results" class="itinerary">
        <div>Départ: {{moment(itinerary.startTime).format('LLL')}}</div>
        <div>Arrivée: {{moment(itinerary.endTime).format('LLL')}}</div>
        <Duration :data="itinerary.duration" />
        <div>{{itinerary.transfers}} changement(s)</div>

        <div>Étapes</div>
        <div class="legs">
          <div v-for="(leg, index) in itinerary.legs">
            <LegWalk v-if="leg.mode === 'WALK'" :leg="leg" :index="index"></LegWalk>
            <LegBus v-if="leg.mode === 'BUS'" :leg="leg" :index="index"></LegBus>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import axios from 'axios';
import moment from 'moment';

import LegWalk from '@/components/LegWalk';
import LegBus from '@/components/LegBus';

export default {
  name: 'Home',
  data: function () {
    return {
      results: [],
    };
  },
  methods: {
    /**
    * When the location is found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
        this[id] = `${addressData.latitude},${addressData.longitude}`;
    },
    /**
    * Call the api for results
    */
    searchJourneys: async function () {
      const result = await axios.post('http://localhost:1323/trip', {
        from: "47.20808979999999,-1.5364250000000084", // this.from,
        to: "47.2129612,-1.5623385000000098", // this.to,
        leaveAt: moment().add(0.5, 'days').format('HH:mma'),
        date: moment().add(1, 'day').format('MM-DD-YYYY'),
      });

      this.results = result.data.plan.itineraries || [];
      console.log('"this, r', this.results, result);
    }
  },
  components: {
    VueGoogleAutocomplete,
    LegWalk,
    LegBus,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.itinerary {
  text-align: center;

  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 2rem;

  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
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
