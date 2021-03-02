import Vue from "vue";

class GroupTypeService {
    getAll() {
        return Vue.axios.get("/grouptype");
    }

    getAllGroups(id) {
        return Vue.axios.get(`/grouptype${id}`);
    }

    create(data) {
        return Vue.axios.post("/grouptype", data);
    }

    update(id, data) {
        return Vue.axios.put(`/grouptype${id}`, data);
    }

    delete(id) {
        return Vue.axios.delete(`/grouptype${id}`);
    }
}

export default new GroupTypeService();