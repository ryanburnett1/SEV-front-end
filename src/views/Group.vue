<template>
<v-container>
  <v-toolbar
    dark
    color="blue"
  >
	
    <v-toolbar-title>Group selection</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
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

<v-divider></v-divider>

    <v-expansion-panels>
    <v-expansion-panel
      v-for="(group,i) in groups"
      :key="i"
	  @click.native="$router.push({name: 'GroupView', params: {id: group.id}})"
    >
      <v-expansion-panel-header>
        Group {{ i + 1 }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</v-container>
</template>

<script>
import GroupService from "../services/groupServices.js";
import Group from "@/models/group.model";

export default {
	data() {
		return {
			groups: [],
			groupTypes: []
		}
	},
	// computed: {
	// 	filteredData() {
			
	// 	}
	// },
	mounted() {
		GroupService.getAll().then(response => {
			response.data.data.forEach(element => {
				let group = new Group(element);
				Object.freeze(group);
				this.groups.push(group);
			});
		});
		Object.freeze(this.groups);
	}
	
};
</script>
