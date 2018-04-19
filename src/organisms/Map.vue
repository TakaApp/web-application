<template>
  <div class="map">
    <l-map ref="map" style="height: 100vh" :zoom.sync="zoom" :center.sync="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-polyline
        v-for="step in trip"
        v-bind:key="step.id"
        :lat-lngs="step.latlngs"
        :color="step.color"
        :dashArray="step.dashArray"
        :weight="8"
      />

      <l-marker
        v-for="marker in markers"
        v-if="marker"
        v-bind:key="marker ? marker.id : null"
        :lat-lng="marker ? marker.latLng : null"
        :draggable="false"
      />
    </l-map>
  </div>
</template>

<script>

import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

export default {
  name: 'Map',
  props: {
    markers: {
      default: () => [],
      type: Array,
    },
    trip: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      center: this.center || L.latLng(47.209136, -1.547149),

      // map style
      url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      // seems like a good value
      zoom: this.zoom || 13,
      // because we support the community
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
  },
};
</script>

<style scoped>

.search-form-container {
  display: flex;
  flex-direction: column;

  padding: .25rem .5rem;
}

.map {
  background-color: #FFF;
  height: 100vh;
  flex: 3;
  overflow-x: auto;
}

</style>
