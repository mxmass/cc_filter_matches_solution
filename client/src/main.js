import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import Vuetify from 'vuetify'
import App from './App.vue'
// import store from './store'
// import './registerServiceWorker'
import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.config.productionTip = false

new Vue({
  // store,
  render: h => h(App)
}).$mount('#app')
