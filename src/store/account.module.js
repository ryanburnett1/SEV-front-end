// import service helper here for REST calls
import router from "@/router/index.js";
// import User from "@/models/user.model";
import userService from "@/services/userServices";

const state = {
    isLogin: false,
    token: null,
    user: null,
};

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest', { email })

        userService.getUser({ email, password }).then(response => {
            console.log(response);

            if (response.data) {
                commit('loginSuccess', response.data.data);
                router.push("/")
            } else {
                console.log("Failure")
            }

            
        }).catch(err => {
            console.log(err)
        });
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
    getUserId: state => state.user.personId,
    getUserRole: state => state.user.role,
}


export const account = {
    //namespaced: true,
    state,
    actions,
    mutations,
    getters,
};