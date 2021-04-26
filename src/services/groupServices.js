import Vue from "vue";
//import Group from "@/models/group.model";

class GroupService {
  getAll() {
    return Vue.axios.get("/group");
  }

  updatePeople(id, ids) {
    return Vue.axios.put(`/group/${id}/people`, { ids });
  }

  get(id) {
    return Vue.axios.get(`/group/${id}`);
  }

  // getAllPeople(id) {
  //   return Vue.axios.get(`/group/${id}`);
  // }

  create(data) {
    return Vue.axios.post("/group", data);
  }

  update(id, data) {
    return Vue.axios.put(`/group/${id}`, data);
  }

  delete(id) {
    return Vue.axios.delete(`/group/${id}`);
  }
}

export default new GroupService();
