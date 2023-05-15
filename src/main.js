import Vue from 'vue'
import VueVega from 'vue-vega'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueVega)
new Vue({
  render: h => h(App),
}).$mount('#app')
