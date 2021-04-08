import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyMask from "vuetify-mask";
import DatetimePicker from "vuetify-datetime-picker";
import "./plugins/vee-validate";
import GoogleAuth from "@/plugins/gauth.js";
import VueMoment from "vue-moment";

const gauthOption = {
  clientId: process.env.VUE_APP_GCLIENT_ID,
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GoogleAuth, gauthOption);

Vue.use(VuetifyMask);
Vue.use(VueMoment, {});
Vue.use(DatetimePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
