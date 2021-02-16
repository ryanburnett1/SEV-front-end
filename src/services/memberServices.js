// import { _axios } from "@/plugins/axios.js"
import Vue from "vue"

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
}


export default new MemberService();