import Vue from "vue";

class GroupService {
  getAll() {
    return Vue.axios.get("/group");
  }

  getOne(id) {
    return Vue.axios.get(`/group/${id}`);
  }

  getAllPeople(id) {
    return Vue.axios.get(`/group/${id}`);
  }

  deletePeople(groupId, personIds) {
    return Vue.axios.delete(`/group/${groupId}/people`, {
      ids: personIds
    });
  }

  addPeople(groupId) {
    return Vue.axios.delete(`/group/${groupId}/people`);
  }

  create(data) {
    return Vue.axios.post("/group", data);
  }//create a group

  udpate(id, data) {
    return Vue.axios.put(`/group/${id}`, data);
  }//update a group

  add(id, data) {
    return Vue.axios.post(`/group/${id}`, data);
  }//add a group

  delete(id) {
    return Vue.axios.delete(`/group/${id}`);
  }//delete a group

}

export default new GroupService();
