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
        this[id] = `(${addressData.latitude},${addressData.longitude})`;
    },
    /**
    * Call the api for results
    */
    searchJourneys: function () {
      console.log('from', this.from, 'to', this.to);
      // TODO call the api
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
