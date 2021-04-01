<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Person from "@/models/person.model";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
      relationships: [],
      personInPerspective: new Person(),
    };
  },
  methods: {
    testfunc() {
      console.log(this.personInPerspective);
    },
  },
};
</script>
