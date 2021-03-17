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
  // keeps user logged in when refreshing page
  plugins: [
    createPersistedState({
      fetchBeforeUse: true, // retrive user info from store before rehydration
      // logs user back in when page refreshes - allows for updating user role, info, etc.,
      // ...without needing to logout and signing back in
      rehydrated: function(state) {
        if (state.getters.isLoggedIn) {
          state.dispatch("relogin", {
            userId: state.getters.getUserId,
            token: state.getters.getUserToken,
          });
        }
      },
    }),
  ],
});
