<template>
  <v-dialog v-model="dialog" persistent max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container fluid>
        <v-row class="pt-2" align="center" justify="center">
          <v-avatar color="primary" size="72">
            <v-img
              :src="person.getPicturePath()"
              :lazy-src="require('@/assets/images/placeholder_gray.png')"
            ></v-img>
          </v-avatar>
        </v-row>
        <v-row align="center" justify="center">
          <v-card-title>
            <span class="headline"
              >Edit {{ person.getPreferredName() }}'s Relationships</span
            >
          </v-card-title>
        </v-row>
        <v-row align="center" justify="center">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Person from "@/models/person.model";
//import Relationship from "@/models/relationship.model";

export default {
  props: {
    person: {
      type: Person,
      default: new Person({
        firstName: "Test",
        lastName: "McTest",
        picture: "RANDOM",
        id: -1,
        status: "Inactive",
      }),
    },
    relationships: {
      //relationship array
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    testfunc() {
      console.log(this.person);
    },
  },
};
</script>
