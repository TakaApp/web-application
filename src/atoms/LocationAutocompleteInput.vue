<template>
  <div class="styled-input">
    <div class="input-container">
      <el-autocomplete
        v-model="inputData"
        :fetch-suggestions="querySearch"
        v-bind:placeholder="this.focused ? 'Ou cliquez sur la carte !' : placeholder"
        class="address-input"
        @select="handleSelect"
        @focus="e => {
          $emit('focus');
          this.focused = true;
        }"
        @blur="e => {
          $emit('blur');
          this.focused = false;
        }"
      >
        <template slot-scope="{ item }">
          <div class="value">{{ item.name }}</div>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LocationAutocompleteInput',
  props: ['id', 'placeholder', 'placechanged'],
  data() {
    return {
      focused: false,
      inputData: '',
    };
  },
  methods: {
    handleSelect(v) {
      this.inputData = v.name;
      this.placechanged(
        {
          lat: v.lat,
          lng: v.lng,
        },
        this.id,
      );
    },
    async querySearch(queryString, cb) {
      if (!queryString) return cb([]);
      const requestResult = await axios.get(
        `${process.env.API_URL}/search-location/${queryString}`,
      );
      const data = requestResult.data;

      return cb(data || []);
    },
    forceCoordinates(latlng) {
      this.inputData = `${latlng.lat}${latlng.lng}`;
    },
  },
};
</script>

<style>
.el-input {
  font-size: 16px !important;
  line-height: 16px !important;
}
</style>


<style scoped>
.styled-input {
  font-size: 16px !important;
  line-height: 16px !important;

  background-color: #ffffff !important;
  border-radius: 4px !important;
  border: 1px solid #dbdbdb !important;
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
  width: 100%;

  font-size: 14px !important;
  line-height: 14px !important;

  letter-spacing: unset !important;
  padding-top: unset !important;
  padding-bottom: unset !important;

  color: #484848 !important;
  background-color: transparent !important;
  border: 0px !important;
  padding: 0 !important;
  width: 100% !important;
  font-weight: normal !important;
  text-overflow: ellipsis;
}

input:focus {
  outline: none;
}
</style>
