// import service helper here for REST calls
import router from "@/router/index.js";
// import User from "@/models/user.model";
import userService from "@/services/userServices";

const state = {
    isLogin: false,
    session: null,
    user: null,
    token: null,
};

const actions = {
    login({ commit }, { email, password }) {
        commit('loginRequest', { email })
        
        userService.login({ email, password }).then(response => {
            let session = response.data.data;
            
            if (session) {
                commit('loginSuccess', session);
                router.push("/")
            } else {
                commit('loginFailure')
            }
        }).catch(err => {
            console.log(err)
        });
    },
    logout({ commit, getters }) {
        console.log(getters.getUserToken, getters.getUserId, getters.getSessionId)

        userService.logout({
            userId: getters.getUserId,
            sessionId: getters.getSessionId,
            token: getters.getUserToken,
        }).then(response => {
            console.log(response)
        })
        
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
        state.session = null;
        state.user = null;
        state.token = null;
    },
    loginSuccess(state, session) {
        state.isLoggedIn = true;
        state.session = session;
        state.user = session.user;
        state.token = session.token
    },
    loginRequest(state, email) {
        state.isLogin = true;
        state.token = null;
        state.user = email;
        state.token = null;
    },
    loginFailure(state) {
        state.isLogin = false;
    }
}

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getPersonId: state => state.user.personId,
    getUserId: state => state.user.id,
    getUserRole: state => state.user.role,
    getUserToken: state => state.token,
    getSessionId: state => state.session.id,
    isAdmin: state => state.user.role == "admin",
}


export const account = {
    //namespaced: true,
    state,
    actions,
    mutations,
    getters,
};