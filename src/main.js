import Vue from 'vue'
import App from './App.vue'

import router from '@/routes/index.js'
import vuetify from "@/plugins/vuetify.js"

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  render: h => h(App),
}).$mount('#app')
