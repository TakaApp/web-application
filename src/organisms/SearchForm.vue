<template>
  <div class="search-form-container">

    <div class="from-to-inputs">
      <GoogleAutocompleteInput
        id="from"
        placeholder="Départ"
        :placechanged="getAddressData"
      />
      <GoogleAutocompleteInput
        id="to"
        placeholder="Arrivée"
        :placechanged="getAddressData"
        style="margin-top: .5rem"
      />
    </div>

    <div class="options">
      <div class="options-selector">
        <div class="select">
          <select
            :value="timeParameter"
            @change="event => { $emit('onChangeTimeParameter', event.target.value) }"
          >
            <option value="leaveNow">Partir maintenant</option>
            <option value="leaveAt">Partir à</option>
            <option value="arriveAt">Arriver à</option>
          </select>
        </div>
      </div>
      <div v-if="timeParameter === 'leaveAt'" class="date-options">

      </div>
    </div>

    <div v-if="dev" class="button-container">
      <Button
        :onClick="debug"
        label="Rechercher"
        style="margin-top: .5rem"
      />
    </div>

  </div>
</template>

<script>

import GoogleAutocompleteInput from '@/atoms/GoogleAutocompleteInput';
import Button from '@/atoms/Button';

export default {
  name: 'SearchForm',
  props: [
    'debug',
    'onFromUpdate',
    'onToUpdate',

    'timeParameter',
    'onChangeTimeParameter',
  ],
  data() {
    return {
      dev: process.env.NODE_ENV === 'development',
    };
  },
  methods: {
    /**
    * When the location is found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData(addressData, placeResultData, id) {
      if (id === 'from') {
        this.onFromUpdate({
          latitude: addressData.latitude,
          longitude: addressData.longitude,
        });
      }
      if (id === 'to') {
        this.onToUpdate({
          latitude: addressData.latitude,
          longitude: addressData.longitude,
        });
      }
    },
  },
  components: {
    GoogleAutocompleteInput,
    Button,
  },
};
</script>

<style scoped>

.search-form-container {
  display: flex;
  flex-direction: column;

}

.from-to-inputs, .options, .button-container {
  padding: 16px .5rem;
}
.from-to-inputs {
  padding-top: 0;
}

.options {
  display: flex;
  flex-direction: column;
  width: calc(100% - .5rem - 6px);
  background-color: #60dfcd;
  background-image: linear-gradient(315deg, #60dfcd 0%, #1e9afe 74%);
}

.option-selector {
  flex: 1;
}


/* Reset Select */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: transparent;
  background-image: none;
}
/* Custom Select */
.select {
  position: relative;
  display: block;
  width: 13rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: transparent;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, .95);
}
select {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 .5em;
  color: #fff;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}
/* Arrow */
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1em;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}
.select::after {
  -webkit-transition: .25s all ease;
  -o-transition: .25s all ease;
  transition: .25s all ease;
}

option {
  color: #000;
  background-color: #FFF;
}


</style>
