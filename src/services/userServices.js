// import { _axios } from "@/plugins/axios.js"
import Vue from "vue"

class UserService {
    getAll() {
        return Vue.axios.get("/user");
    }

    get(id) {
        return Vue.axios.get(`/user/${id}`);
    }

    create(data) {
        return Vue.axios.post("/user", data);
    }

    update(id, data) {
        return Vue.axios.put(`/user/${id}`, data);
    }

    delete(id) {
        return Vue.axios.delete(`/user/${id}`);
    }

    getUser(data) {
        return Vue.axios.post(`/user/login`, data);
    }
    
    // other unique route queries here
    // example findByAttributeNameHere(data)
    // return get(`/route?attrib=${param}`)
}


export default new UserService();
