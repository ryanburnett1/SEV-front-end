// import { _axios } from "@/plugins/axios.js"
import Vue from "vue";

class RESTService {
  getAll(route) {
    return Vue.axios.get(route);
  }

  get(route, id) {
    return Vue.axios.get(route.concat(id));
  }

  create(route, data) {
    return Vue.axios.post(route, data);
  }

  update(route, id, data) {
    return Vue.axios.put(route.concat(id), data);
  }

  delete(route, id) {
    return Vue.axios.delete(route.concat(id));
  }

  // other unique route queries here
  // example findByAttributeNameHere(data)
  // return get(`/route?attrib=${param}`)
}

export default new RESTService();