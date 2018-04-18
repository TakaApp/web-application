<template>
  <div class="search-form-container">

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

    <Button
      :onClick="onSearch"
      label="Rechercher"
      style="margin-top: .5rem"
    />

  </div>
</template>

<script>

import GoogleAutocompleteInput from '@/atoms/GoogleAutocompleteInput';
import Button from '@/atoms/Button';

export default {
  name: 'SearchForm',
  props: [
    'onSearch',
    'onFromUpdate',
    'onToUpdate',
  ],
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

  padding: .25rem .5rem;
}

</style>
