// import service helper here for REST calls
import router  from "@/router/index.js";

const state = {
    isLogin: false,
    token: null,
    user: null,
    roles: [],
};

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest', { email })

        console.log("test")

        let result = password //change to axios request Login(username, password)
        if (result) {
            // pass user object with info here
            commit('loginSuccess', { name: "test user", id: -1});
            console.log('login successful')
            router.push("/")
        }

    },
    logout({ commit }) {
        commit('resetState')

        // sessionStorage.clear();

        console.log("Logging Out")
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
    loginSuccess(state, user) {
        state.isLoggedIn = true;
        state.token = "A TOKEN, CHECK account.module.js";
        state.user = user;
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

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserId: state => state.user.id,
}


export const account = {
    //namespaced: true,
    state,
    actions,
    mutations,
    getters,
};