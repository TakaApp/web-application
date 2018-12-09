<template>
  <div class="map">
    <l-map
      ref="map"
      style="height: 100vh"
      :zoom.sync="zoom"
      :center.sync="center"
      @click="e => { $emit('click', e.latlng); }"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <span v-for="(trip, index) in trips" v-bind:key="index">
        <l-polyline
          v-for="step in trip.polyLines"
          v-bind:key="step.id"
          :lat-lngs="step.latlngs"
          :color="step.color"
          :dashArray="step.dashArray"
          :weight="step.weight"
          v-on:click="(event) => { $emit('toggleItinerary', step.resultId) }"
        />
      </span>

      <l-marker
        v-for="marker in markers"
        v-if="marker"
        v-bind:key="marker ? marker.id : null"
        :lat-lng="marker ? marker.latlng : null"
        :draggable="true"
        v-on:moveend="(event) => { $emit('updateMarker', event.target, marker.id) }"
      />
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

export default {
  name: 'MyMap',
  props: {
    markers: {
      default: () => [],
      type: Array,
    },
    trips: {
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
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
    };
  },
  methods: {
    fitMap() {
      if (this.markers.length === 2 && this.markers[0] && this.markers[1]) {
        const polyLinesLatLngs = [];
        this.trips.forEach(trip => {
          trip.polyLines.forEach(polyLine => {
            polyLine.latlngs.forEach(latlng => {
              polyLinesLatLngs.push(L.latLng(latlng[0], latlng[1]));
            });
          });
        });
        const bounds = L.latLngBounds([
          this.markers[0].latlng,
          this.markers[1].latlng,
          ...polyLinesLatLngs,
        ]);
        this.$refs.map.mapObject.fitBounds(bounds);
      } else if (this.markers[0]) {
        this.center = L.latLng(
          this.markers[0].latlng.lat,
          this.markers[0].latlng.lng,
        );
      } else if (this.markers[1]) {
        this.center = L.latLng(
          this.markers[1].latlng.lat,
          this.markers[1].latlng.lng,
        );
      }
    },
  },
  watch: {
    markers() {
      this.fitMap();
    },
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

  padding: 0.25rem 0.5rem;
}

.map {
  background-color: #fff;
  height: 100vh;
  flex: 1;
  overflow-x: auto;
}

@media only screen and (max-width: 600px) {
  .map {
    display: none;
  }
}
</style>
