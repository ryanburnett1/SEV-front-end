// import { _axios } from "@/plugins/axios.js"
import Vue from "vue";

class MemberService {
  getAll() {
    return Vue.axios.get("/person");
  }

  get(id) {
    return Vue.axios.get(`/person/${id}`);
  }

  create(data) {
    return Vue.axios.post("/person", data);
  }

  update(id, data) {
    return Vue.axios.put(`/person/${id}`, data);
  }

  delete(id) {
    return Vue.axios.delete(`/person/${id}`);
  }

  uploadImage(id, fileData) {
    const formData = new FormData();
    formData.append("file", fileData);
    return Vue.axios.post(`/person/${id}/picture`, formData);
  }

  // other unique route queries here
  // example findByAttributeNameHere(data)
  // return get(`/route?attrib=${param}`)
}

export default new MemberService();
