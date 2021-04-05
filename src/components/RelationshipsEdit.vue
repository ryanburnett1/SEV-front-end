<template>
  <v-dialog v-model="dialog" persistent max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container fluid>
        <v-btn @click="showRels">Show relationships</v-btn>
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
        <v-row>
          <v-col>
            <v-select
              :items="filteredSelectablePersons"
              v-model="newPerson"
              return-object
            >
              <template v-slot:selection="{ item }">
                <MemberSelectItem :person="item"></MemberSelectItem>
              </template>
              <template v-slot:item="{ item }">
                <MemberSelectItem :person="item"></MemberSelectItem>
              </template>
            </v-select>
          </v-col>
          <v-col></v-col>
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
              @change="relationshipChanged($event, index)"
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
import MemberSelectItem from "@/components/MemberSelectItem.vue";
import Person from "@/models/person.model";
import Relationship from "@/models/relationship.model";
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
    selectablePersons: {
      //person array
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      newPerson: new Person(),
      newRelationship: new Relationship(),
    };
  },
  computed: {
    //returns all people that don't have any relationships yet
    filteredSelectablePersons() {
      return this.selectablePersons.filter(p => {
        return !this.persons.includes(p);
      });
    },
  },
  components: {
    RelationshipCardEdit,
    MemberSelectItem,
  },
  methods: {
    relationshipChanged(value, index) {
      if (this.relationships[index].person1Id == this.persons[index].id) {
        this.relationships[index].type1 = value;
        this.relationships[index].type2 = invertRelationship(
          value,
          this.persons[index].sex
        );
      } else {
        this.relationships[index].type2 = value;
        this.relationships[index].type1 = invertRelationship(
          value,
          this.persons[index].sex
        );
      }
      console.log("thingy");
      console.log(this.relationships);
    },
    showRels() {
      console.log(this.persons);
      console.log(this.relationships);
    },
  },
};

//inversion data

//FORMAT:
//if they are my (relationship)brother, and I am (gender)male, then I am their (inversion)brother
//if they are my (relationship)brother, and I am (gender)female, then I am their (inversion)sister
const INVERSIONS = {
  Male: [
    { relationship: "Brother", inversion: "Brother" },
    { relationship: "Sister", inversion: "Brother" },
    { relationship: "Father", inversion: "Son" },
    { relationship: "Mother", inversion: "Son" },
    { relationship: "Son", inversion: "Father" },
    { relationship: "Daughter", inversion: "Father" },
    { relationship: "Husband", inversion: "Husband" },
    { relationship: "Wife", inversion: "Husband" },
    { relationship: "Grandfather", inversion: "Grandson" },
    { relationship: "Grandmother", inversion: "Grandson" },
    { relationship: "Grandson", inversion: "Grandfather" },
    { relationship: "Granddaughter", inversion: "Grandfather" },
  ],
  Female: [
    { relationship: "Brother", inversion: "Sister" },
    { relationship: "Sister", inversion: "Sister" },
    { relationship: "Father", inversion: "Daughter" },
    { relationship: "Mother", inversion: "Daughter" },
    { relationship: "Son", inversion: "Mother" },
    { relationship: "Daughter", inversion: "Mother" },
    { relationship: "Husband", inversion: "Wife" },
    { relationship: "Wife", inversion: "Wife" },
    { relationship: "Grandfather", inversion: "Granddaughter" },
    { relationship: "Grandmother", inversion: "Granddaughter" },
    { relationship: "Grandson", inversion: "Grandmother" },
    { relationship: "Granddaughter", inversion: "Grandmother" },
  ],
};

function invertRelationship(person1Relationship, person1Gender) {
  return INVERSIONS[person1Gender].find(value => {
    return value.relationship == person1Relationship;
  }).inversion;
}
</script>
