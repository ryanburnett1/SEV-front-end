import RESTService from "@/services/restServices";

const state = {
  skills: []
};

const actions = {
  retrieveSkillList({ commit }) {
    RESTService.getAll("skill").then(response => {
      let skillList = response.data.data;
      commit("setState", skillList);
    });
  },
  clearState({ commit }) {
    commit("resetState");
  }
};

const mutations = {
  setState(state, skills) {
    state.skills = skills;
  },
  resetState(state) {
    state.skills = [];
  }
};

const getters = {
  getSkillList: state => state.skills
};

export const skill = {
  //namespaced: true,
  state,
  actions,
  mutations,
  getters
};
