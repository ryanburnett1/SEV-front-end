import Vue from "vue";

class GroupService {
    getAll() {
        return Vue.axios.get("/group");
    }

    getAllPeople(id) {
        return Vue.axios.get(`/group/${id}`);
    }

    create(data) {
        return Vue.axios.post("/group", data);
    }

    udpate(id, data) {
        return Vue.axios.put(`/group/${id}`, data);
    }

    delete(id) {
        return Vue.axios.delete(`/group/${id}`);
    }

}

export default new GroupService();