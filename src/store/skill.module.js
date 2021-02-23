import RESTService from "@/services/restServices";

const state = {
  skills: []
};

const actions = {
  retrieveSkillList({ commit }) {
    RESTService.getAll("skill").then((response) => { 
      let skillList = Object.assign({}, response.data.data)
      commit("setState", skillList)
    })

  },
  clearState({ commit }) {
    commit("resetState");
  }
};

const mutations = {
  setState(state) {
    state.skills = state;
  },
  resetState(state) {
    state.skills = [];
  },
  
};

const getters = {
  getSkillList: state => state.skills,
};

export const skill = {
  //namespaced: true,
  state,
  actions,
  mutations,
  getters
};
