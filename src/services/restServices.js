// A Rest Service where you can pass the route and data
import Vue from "vue";

class RESTService {
  getAll(route) {
    return Vue.axios.get(route);
  }

  get(route, id) {
    if (id) {
      return Vue.axios.get(route.concat(id));
    } else {
      return Vue.axios.get(route);
    }
  }

  create(route, data) {
    return Vue.axios.post(route, data);
  }

  update(route, id, data) {
    return Vue.axios.put(route.concat(id), data);
  }

  put(route, data) {
    return Vue.axios.put(route, data);
  }

  delete(route, id) {
    return Vue.axios.delete(route.concat(id));
  }

  getDescription(route) {
    return Vue.axios.get(route + "/description");
  }

  // other unique route queries here
  // example findByAttributeNameHere(data)
  // return get(`/route?attrib=${param}`)
}

export default new RESTService();
