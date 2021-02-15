// import service helper here for REST calls
import { router } from "@/router/index.js";

const state = {
    isLogin: false,
    token: null,
    user: null,
};

const actions = {
    login({ commit }, { uesrname, password }) {
        commit('loginRequest', { uesrname })

        console.log("test")

        let result = password //change to axios request Login(username, password)
        if (result) {
            commit('loginSuccess');
            console.log('login successful')
            router.push("/")
        }

    },
    logout({ commit }) {
        commit('resetState')
        router.push('/')
    },
    clearState({ commit }) {
        commit('resetState');
    }
}

const mutations = {
    resetState(state) {
        state.isLogin = false;
        state.token = null;
        state.user = null;
    },
    loginRequest(state, user) {
        state.isLogin = true;
        state.token = null;
        state.user = user;
    },
    loginFailure(state) {
        state.isLogin = false;
    }
}


export const account = {
    namespaced: true,
    state,
    actions,
    mutations,
};