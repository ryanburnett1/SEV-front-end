import Vue from "vue";
import Vuex from "vuex";

import { account } from "./account.module";
import { skill } from "./skill.module";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    skill,
  },
  plugins: [createPersistedState()]
});
