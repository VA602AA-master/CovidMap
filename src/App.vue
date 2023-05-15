<template>
  <div id="app">
      <h1>My map</h1>
      <div id="map"></div>
      <div style="background-color: bisque; width: 100%; height:500px" >
          <svg id="map" ref="map" width="800" height="600">
            <g class="background" ref="background"/>
            <g class="foreground" ref="foreground"/>
          </svg>
      </div>
  </div>
</template>

<script>
const d3 = require('d3');
import MapVisualization from './assets/mapVisualization.js';

const map = MapVisualization();

export default {
  name: 'App',
  components: {

  },
  data(){
      return{
        featureCollection: {},
      }
  },
  mounted(){
      fetch('/limits_IT_regions.geojson')
      .then(response => response.json())
      .then(data => {
          this.featureCollection = data;
          console.log(this.featureCollection);
          this.refreshMap();
    })
  },
  methods:{
      refreshMap(){
          const g = d3.select(this.$refs.background);
          g.datum(this.featureCollection)
              .call(map);

      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

svg path{
    stroke: bisque;
    stroke-width: 1px;
    fill: lightgray;
}
</style>
