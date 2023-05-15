<template>
  <b-container id="app">
      <b-row>
          <b-col><h1>My map</h1></b-col>
      </b-row>
      <b-row>
          <b-col>
              <svg id="map" ref="map" width="800" height="600">
                  <g class="background" ref="background"/>
                  <g class="foreground" ref="foreground"/>
              </svg>
          </b-col>
          <b-col cols="3">
              <b-form-group label="Select a feature">
                  <b-form-select v-model="current_feature" :options="attribute_options">

                  </b-form-select>
              </b-form-group>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
const d3 = require('d3');
import {MapVisualization, BubbleMapVisualization} from './assets/mapVisualization.js';

const projection = d3.geoMercator()
    .center([12.490367188063198, 42.004858406718476])
    .scale(1800);

const map = MapVisualization().projection(projection);
const bubbleMap = BubbleMapVisualization().projection(projection);

export default {
  name: 'App',
  components: {

  },
  data(){
      return{
        featureCollection: {},
        covid_statistics: [],
        current_feature: 'totale_positivi',
        attribute_options: [
            'totale_positivi',
            'deceduti',
            'dimessi_guariti',
            'totale_casi',
            'tamponi',
            'terapia_intensiva',
            'totale_ospedalizzati',
            'isolamento_domiciliare'
        ]
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

      d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-20200403.csv', d3.autoType)
      .then(data => {
          this.covid_statistics = data;
      })
  },
  methods:{
      refreshMap(){
          const g = d3.select(this.$refs.background);
          g.datum(this.featureCollection)
              .call(map);
          const gf = d3.select(this.$refs.foreground);
          gf.datum(this.covid_statistics)
              .call(bubbleMap);
      }
  },
  watch:{
      current_feature(newVal){
          bubbleMap.attribute(newVal);
          this.refreshMap();
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

svg g.background path{
    stroke: black;
    stroke-width: 1px;
    fill-opacity: 0.2;
    fill: none;
}
</style>
