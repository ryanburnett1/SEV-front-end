<template>
  <v-container>
    <v-toolbar dark color="blue">
      <v-toolbar-title>Group selection</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="groups"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Search for Groups"
        solo-inverted
      ></v-autocomplete>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel v-for="group in groups" :key="group.id">
        <v-expansion-panel-header>
          {{ group.name }}
        </v-expansion-panel-header>
        <v-btn icon @click="edit(group)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-expansion-panel-content
          v-for="person in group.person"
          :key="person.id"
        >
          {{ person.preferredFullName() }}
          {{ this.users[person.id].email() }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn @click="create()">Add Group</v-btn>

    <admin-fab :createFunction="create"></admin-fab>
  </v-container>
</template>

<script>
import GroupService from "../services/groupServices.js";
import Group from "@/models/group.model";
import AdminFab from "@/components/AdminFab.vue";
import UserService from "@/services/userServices.js";
// import User from "@/models/user.model.js";
//@click.native="$router.get({name: 'GroupView', params: {id: group.id}})"

export default {
  components: {
    AdminFab,
  },
  data() {
    return {
      groups: [],
      groupTypes: [],
      ids: [],
      users: [],
      select: null,
      loading: null,
      items: [],
      emails: [],
      search: "",
    };
  },
  methods: {
    create() {
      this.$router.push({ name: "GroupEdit", params: { id: 0, isAdd: true } });
    },
    edit(group) {
      console.log(group);
      this.$router.push({
        name: "GroupEdit",
        params: { id: group.id, isAdd: false },
      });
    },
  },
  mounted() {
    GroupService.getAll().then(response => {
      const gr = response.data.data.map(g => new Group(g));
      this.groups = Array.from(gr)
      //console.log(this.groups);

      UserService.getAll().then(response => {

        this.users = response.data.data;
        gr.forEach(group => {
          let ids = group.person.map(p => p.id)
          const personUsers = this.users.filter(u => ids.includes(u.personId))
          console.log(personUsers.map(u => u.email))
        });

      })

      // let ids = this.group.map(x => x.id)
      // UserService.getByPeople(ids).then(response => {
      //   this.users = response.data.data.map(u => new User(u));
      //   console.log("received user: ", this.users);
      // })
    });
    
    
  },
};
</script>
