// import service helper here for REST calls
import router from "@/router/index.js";
// import User from "@/models/user.model";
import userService from "@/services/userServices";
import axios from "axios";


const state = {
  isLogin: false,
  session: null,
  user: null,
  token: null,
  darkMode: true,
};

const actions = {
  login({ commit }, { email, password }) {
    commit("loginRequest", { email });

    userService
      .login({ email, password })
      .then(response => {
        let session = response.data.data;

        // console.log(session);

        if (session) {
          commit("loginSuccess", session);
          router.push("/");
        } else {
          commit("loginFailure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  relogin({ commit }, { userId, token }) {

    // for timing imprecisiton of store rehydration
    const ax = axios.create({
      baseURL: process.env.VUE_APP_ROOT_API,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        "Access-Control-Allow-Origin": "*",
      }
    });

    ax.post(`/user/auth`, { userId, token }).then(res => {
      commit('reloginSuccess', res.data.data);
    })

    

    // userService.getUser(userId, token).then(res => {
    //   console.log(res)
    // })
  },
  logout({ commit, getters }) {
    // console.log(getters.getUserToken, getters.getUserId, getters.getSessionId);

    userService
      .logout({
        userId: getters.getUserId,
        sessionId: getters.getSessionId,
        token: getters.getUserToken,
      })
      .then(response => {
        console.log(response);
      });

    commit("resetState");
    router.push("/");
  },
  clearState({ commit }) {
    commit("resetState");
  },
  toggleTheme({ commit }, { isDark }) {
    commit("setTheme", isDark)
  }
};

const mutations = {
  setTheme(state, isDark) {
    console.log(isDark);
    state.darkMode = isDark;
  },
  resetState(state) {
    state.isLogin = false;
    state.session = null;
    state.user = null;
    state.token = null;
  },
  reloginSuccess(state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  loginSuccess(state, session) {
    state.isLoggedIn = true;
    state.session = session;
    state.user = session.user;
    state.token = session.token;
  },
  loginRequest(state, email) {
    state.isLogin = true;
    state.token = null;
    state.user = email;
    state.token = null;
  },
  loginFailure(state) {
    state.isLogin = false;
  },
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  isDarkTheme: state => state.darkMode,
  getPersonId: state => state.user.personId,
  getUserId: state => state.user.id,
  getUserRole: state => state.user.role,
  getUserToken: state => state.token,
  getSessionId: state => state.session.id,
  getUserEmail: state => state.user.email,
  isAdmin: state => state.user.role == "Admin",
};

export const account = {
  //namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
