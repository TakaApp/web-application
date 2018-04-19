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
          <el-select
            :value="timeParameter"
            @input="value => { $emit('onChangeTimeParameter', value) }"
          >
            <el-option value="leaveNow" label="Partir maintenant" />
            <el-option value="leaveAt" label="Partir à" />
            <el-option value="arriveAt" label="Arriver à" />
          </el-select>
        </div>
      </div>
      <div v-if="timeParameter === 'leaveAt' || timeParameter === 'arriveAt'" class="date-options">
        <div class="date-picker">
          <el-date-picker
            type="date"
            :value="date"
            placeholder="Date"
            v-on:input="value => { $emit('onChangeDate', value) }"
          />
        </div>
        <div class="hour-picker">
          <el-time-select
            :value="time"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45',
            }"
            placeholder="Heure"
            v-on:input="value => { $emit('onChangeTime', value) }"
          />
        </div>
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

    'date',
    'onChangeDate',

    'time',
    'onChangeTime',
  ],
  data() {
    return {
      dev: process.env.DEBUG === true,
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
  background-color: #09c7fb;
  background-image: linear-gradient(315deg, #09c7fb 0%, #93fb9d 74%);
}

.from-to-inputs {
}

.from-to-inputs, .options, .button-container {
  padding: 8px .5rem;
}

.options {
  display: flex;
  flex-direction: column;
  width: calc(100% - .5rem - 6px);
}

.option-selector {
  flex: 1;
}

.options > div:only-child > .select  {
  margin-bottom: 0;
}

.select {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  margin-bottom: .5rem;
}

.date-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.date-picker, .hour-picker {
  display: flex;
  flex: 1;
}
.date-picker {
  margin-right: 4px;
}
.hour-picker {
  margin-left: 4px;
}
.el-input {
  display: flex;
  flex: 1;
  width: 100%;
}


</style>
