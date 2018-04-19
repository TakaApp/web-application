<template>
  <div class="styled-input">
    <div class="input-container">
      <vue-google-autocomplete
        :id="id"
        :enable-geolocation="true"
        :country="['fr']"
        classname="address-input"
        v-bind:placeholder="placeholder"
        v-on:placechanged="placechanged"
      />
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';


export default {
  name: 'GoogleAutocompleteInput',
  props: [
    'id',
    'placeholder',
    'placechanged',
  ],
  components: {
    VueGoogleAutocomplete,
  },
};
</script>

<style scoped>

.styled-input {
  font-size: 14px !important;
  line-height: 14px !important;

  background-color: #ffffff !important;
  border-radius: 4px !important;
  border: 1px solid #DBDBDB !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  padding: 0px !important;
  display: table !important;
  table-layout: fixed !important;
  height: 42px !important;
  width: 100% !important;
  position: relative !important;
}

.input-container {
  font-size: 14px !important;
  line-height: 14px !important;

  letter-spacing: unset !important;
  padding-top: unset !important;
  padding-bottom: unset !important;
  color: #484848 !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-radius: 2px !important;
  background-color: #ffffff !important;
  position: relative !important;
  z-index: 0 !important;
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-color: #ffffff !important;
  display: block !important;
  width: calc(100% - 2px) !important;
}

.address-input {
  font-size: 14px !important;
  line-height: 14px !important;

  letter-spacing: unset !important;
  padding-top: unset !important;
  padding-bottom: unset !important;

  color: #484848 !important;
  background-color: transparent !important;
  border: 0px !important;
  padding: 11px !important;
  width: calc(100% - 22px) !important;
  font-weight: normal !important;
  text-overflow: ellipsis;
}
</style>
