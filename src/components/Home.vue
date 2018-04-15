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
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Home',
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
        leaveAt: moment().format('HH:mma'),
        date: moment().format('MM-DD-YYYY'),
      });
    }
  },
  components: {
    VueGoogleAutocomplete,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.address-input {
  min-width: 250px;
}

</style>
