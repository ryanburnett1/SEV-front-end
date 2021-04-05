<template>
  <v-dialog v-model="dialog" persistent max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn @click="initData" fab v-bind="attrs" v-on="on">
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
        <v-row class="pl-4" align="start" justify="start">
          <v-card-title class="pa-0 ma-0">
            <span class="headline"
              >Edit {{ personInPerspective.getPreferredName() }}'s
              Relationships</span
            >
          </v-card-title>
        </v-row>
        <v-row class="pl-1">
          <v-col>
            <p v-if="this.filteredSelectablePersons.length < 1">
              No relationships can be added. Everyone already has a relationship
              to {{ this.personInPerspective.getPreferredName() }}.
            </p>
            <v-row v-else class="pl-3">
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
              <v-btn
                @click="addRelationship"
                height="auto"
                class="fab primary ml-4 mt-4"
              >
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row
          align="start"
          justify="start"
          v-for="(person, index) in personsCopy"
          :key="person.id"
        >
          <v-col>
            <RelationshipCardEdit
              :personInPerspective="personInPerspective"
              :person="person"
              :relationship="relsCopy[index]"
              @change="relationshipChanged($event, index)"
            >
            </RelationshipCardEdit>
          </v-col>
        </v-row>
        <v-row align="start" justify="start">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog(false)" color="blue darken-1" text>
              Close
            </v-btn>
            <v-btn @click="closeDialog(true)" color="blue darken-1" text>
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
      //the person we are editing relationships of
      type: Person,
      default: function() {
        return new Person();
      },
    },
    persons: {
      //person array
      //all of the people that have a relatioship
      type: Array,
      default: () => [],
    },
    relationships: {
      //relationship array
      //parallel array to persons
      type: Array,
      default: () => [],
    },
    selectablePersons: {
      //person array
      //all of the people that can be selected for a new relationship
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      relsCopy: [],
      personsCopy: [],
      newPerson: new Person(),
      newRelationship: new Relationship(),
    };
  },
  computed: {
    //returns all people that don't have any relationships yet
    filteredSelectablePersons() {
      return this.selectablePersons.filter(person => {
        if (
          this.personsCopy.find(p => {
            return p.id == person.id;
          })
        ) {
          return false;
        } else {
          return true;
        }
      });
    },
  },
  components: {
    RelationshipCardEdit,
    MemberSelectItem,
  },
  methods: {
    //create a deep copy of props and init people to add
    initData() {
      this.relsCopy = [];
      for (let i = 0; i < this.relationships.length; i++) {
        this.relsCopy.push(new Relationship(this.relationships[i]));
      }
      this.personsCopy = [];
      for (let i = 0; i < this.persons.length; i++) {
        this.personsCopy.push(new Person(this.persons[i]));
      }

      let filteredPersons = this.getFilteredSelectablePersons();
      if (filteredPersons.length > 0) {
        this.newPerson = filteredPersons[0];
        let p1Relationship =
          Relationship.relationshipOptions[this.personInPerspective.sex][0];
        let p2Relationship = invertRelationship(
          p1Relationship,
          this.personInPerspective.sex
        );

        this.newRelationship = new Relationship({
          person1Id: this.personInPerspective.id,
          person2Id: this.newPerson.id,
          type1: p1Relationship,
          type2: p2Relationship,
        });
      } else {
        this.newPerson = new Person();
        this.newRelationship = new Relationship();
      }
    },
    //calculates inverse relsCopy when a relationship is changed
    relationshipChanged(value, index) {
      if (this.relsCopy[index].person1Id == this.personsCopy[index].id) {
        this.relsCopy[index].type1 = value;
        this.relsCopy[index].type2 = invertRelationship(
          value,
          this.personsCopy[index].sex
        );
      } else {
        this.relsCopy[index].type2 = value;
        this.relsCopy[index].type1 = invertRelationship(
          value,
          this.personsCopy[index].sex
        );
      }
    },
    //returns all people that don't have any relationships yet
    getFilteredSelectablePersons() {
      return this.selectablePersons.filter(person => {
        if (
          this.personsCopy.find(p => {
            return p.id == person.id;
          })
        ) {
          return false;
        } else {
          return true;
        }
      });
    },
    addRelationship() {
      //add the newPerson to the list of people with relationships
      this.personsCopy.push(new Person(this.newPerson));
      //add a default relationship for that new person
      let p1Relationship =
        Relationship.relationshipOptions[this.personInPerspective.sex][0];
      let p2Relationship = invertRelationship(
        p1Relationship,
        this.personInPerspective.sex
      );
      this.newRelationship = new Relationship({
        person1Id: this.personInPerspective.id,
        person2Id: this.newPerson.id,
        type1: p1Relationship,
        type2: p2Relationship,
      });
      this.relsCopy.push(new Relationship(this.newRelationship));
      //assign the new person to be the first available selectable person
      let filteredPersons = this.getFilteredSelectablePersons();
      if (filteredPersons.length > 0) {
        this.newPerson = filteredPersons[0];
      } else {
        this.newPerson = new Person();
      }
    },
    closeDialog(isSave) {
      this.dialog = false;
      //make a deep copy of relationships to return
      let returnedRels = [];
      for (let i = 0; i < this.relsCopy.length; i++) {
        returnedRels.push(new Relationship(this.relsCopy[i]));
      }
      this.$emit("close", { isSave: isSave, relationships: returnedRels });
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
