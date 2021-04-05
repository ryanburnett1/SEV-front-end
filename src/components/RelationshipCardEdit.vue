<template>
  <v-card style="border-radius: 0">
    <v-container fluid>
      <v-row>
        <v-avatar color="primary">
          <v-img
            :src="person.getPicturePath()"
            :lazy-src="require('@/assets/images/placeholder_gray.png')"
          ></v-img>
        </v-avatar>
        <v-col class="ma-0 pa-0 pt-2 pl-4">
          <v-row>
            <v-card-title>
              <v-row>
                {{ person.preferredFullName() }}
              </v-row>
            </v-card-title>
          </v-row>
          <v-row class="mt-0">
            <v-select
              :items="relationshipOptions"
              @change="valueChanged"
              :value="selectedRelationship"
              dense
              solo
            ></v-select>
          </v-row>
        </v-col>
        <v-col> </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Person from "@/models/person.model";
import Relationship from "@/models/relationship.model";

export default {
  props: {
    person: {
      //the person on the card (can edit his/her relationship)
      type: Person,
      default: new Person({
        firstName: "Test",
        lastName: "McTest",
        picture: "RANDOM",
        id: -1,
        status: "Inactive",
      }),
    },
    //the relationship between person and personInPerspective
    relationship: {
      type: Relationship,
      default: undefined,
    },
    //the person we are editing relationships of
    personInPerspective: {
      type: Person,
      default: new Person({
        firstName: "Test",
        lastName: "McTest",
        picture: "RANDOM",
        id: -1,
        status: "Inactive",
      }),
    },
    value: {},
  },
  computed: {
    relationshipOptions() {
      return Relationship.relationshipOptions[this.person.sex];
    },
    selectedRelationship() {
      if (this.person.id == this.relationship.person1Id) {
        return this.relationship.type1;
      } else {
        return this.relationship.type2;
      }
    },
  },
  methods: {
    valueChanged(value) {
      this.$emit("change", value);
    },
  },
};
</script>
