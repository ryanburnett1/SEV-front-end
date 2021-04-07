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
        <v-expansion-panel-content
          v-for="person in group.person"
          :key="person.id"
        >
          {{ person.preferredFullName() }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <admin-fab :createFunction="create"></admin-fab>
  </v-container>
</template>

<script>
import GroupService from "../services/groupServices.js";
import Group from "@/models/group.model";
import AdminFab from "@/components/AdminFab.vue";
//@click.native="$router.get({name: 'GroupView', params: {id: group.id}})"

export default {
  components: {
    AdminFab,
  },
  data() {
    return {
      groups: [],
      groupTypes: [],
      select: null,
      loading: null,
      items: [],
      search: "",
    };
  },
  computed: {
    filterGroups() {
      return this.search != null
        ? this.groups.filter(g => g.name.includes(this.search))
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
  },
  mounted() {
    GroupService.getAll().then(response => {
      this.groups = response.data.data.map(g => new Group(g));
    });
  },
};
</script>
