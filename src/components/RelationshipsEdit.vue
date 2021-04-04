<template>
  <v-dialog v-model="dialog" persistent max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container fluid>
        <v-row class="pl-4 pt-4" align="start" justify="start">
          <v-avatar color="primary" size="72">
            <v-img
              :src="personInPerspective.getPicturePath()"
              :lazy-src="require('@/assets/images/placeholder_gray.png')"
            ></v-img>
          </v-avatar>
        </v-row>
        <v-row align="start" justify="start">
          <v-card-title>
            <span class="headline"
              >Edit {{ personInPerspective.getPreferredName() }}'s
              Relationships</span
            >
          </v-card-title>
        </v-row>
        <v-row
          align="start"
          justify="start"
          v-for="(person, index) in persons"
          :key="person.id"
        >
          <v-col>
            <RelationshipCardEdit
              :personInPerspective="personInPerspective"
              :person="person"
              :relationship="relationships[index]"
            >
            </RelationshipCardEdit>
          </v-col>
        </v-row>
        <v-row align="start" justify="start">
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
import RelationshipCardEdit from "@/components/RelationshipCardEdit.vue";

export default {
  //persons and relationships are meant to be parallel to each other
  props: {
    personInPerspective: {
      type: Person,
      default: function() {
        return new Person();
      },
    },
    persons: {
      //person array
      type: Array,
      default: () => [],
    },
    relationships: {
      //relationship array
      type: Array,
      default: () => [],
    },
    restrictToFamily: {
      type: Boolean,
      default: function() {
        return false;
      },
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    RelationshipCardEdit,
  },
  methods: {
    testfunc() {
      console.log(this.personInPerspective);
    },
  },
};
</script>
