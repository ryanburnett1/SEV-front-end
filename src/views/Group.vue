<template>
  <v-container>
    <v-toolbar dark color="blue">
      <v-toolbar-title>Group selection</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="groups"
        item-text="name"
        item-value="name"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        clearable
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
      <v-expansion-panel v-for="group in filterGroups" :key="group.id">
        <v-expansion-panel-header>
          {{ group.name }}
        </v-expansion-panel-header>
        <v-btn icon @click="edit(group)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteG(group)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-expansion-panel-content
          v-for="person in group.person"
          :key="person.id"
        >
          {{ person.preferredFullName() }}
          {{ person.user.email }}
          {{ person.cellPhoneNumber() }}
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
  computed: {
    filterGroups() {
      return this.search != null
        ? this.groups.filter(g =>
            g.name.toLowerCase().includes(this.search.toLowerCase())
          )
        : this.groups;
    },
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
    deleteG(group) {
      GroupService.delete(group.id);

      let deletedIndex = this.groups.indexOf(group);
      if (deletedIndex != -1) {
        this.groups.splice(deletedIndex, 1);
      }
    },
  },
  mounted() {
    GroupService.getAll()
      .then(res => res.data.data.map(g => new Group(g)))
      .then(groups => {
        this.groups = groups;

        // Add user to each person in each group
        UserService.getAll()
          .then(res => res.data.data)
          .then(users => {
            this.groups.forEach(group => {
              group.person.forEach(p => {
                p.user = users.find(u => u.personId === p.id);
              });
            });
            console.log("full email list? ", this.emails);
          });
      });
  },
};
</script>
