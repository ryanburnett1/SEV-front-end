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
      <v-expansion-panel v-for="(group, i) in groups" :key="i">
        <v-expansion-panel-header>
          {{ group.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content v-for="(person, i) in group.people" :key="i">
          {{ person.preferredFullName() }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import GroupService from "../services/groupServices.js";
import Group from "@/models/group.model";
//@click.native="$router.get({name: 'GroupView', params: {id: group.id}})"

export default {
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
  // computed: {
  // 	filteredData() {

  // 	}
  // },
  mounted() {
    GroupService.getAll().then(response => {
      response.data.data.forEach(element => {
        let group = new Group(element);
        //Object.freeze(group);
        this.groups.push(group);
      });
    });
    console.log("Groups array:", this.groups);
    //Object.freeze(this.groups);
  },
};
</script>
