<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 6 : 0"
      @click="
        $router.push({
          name: 'MemberView',
          params: { id: person.id },
        })
      "
      style="border-radius: 0"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-avatar color="primary">
              <v-img
                :src="person.getPicturePath()"
                :lazy-src="require('@/assets/images/placeholder_gray.png')"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col class="ma-0 pa-0 pt-2 pl-4">
            <v-row>
              <v-card-title>
                <v-row>
                  {{ person.preferredFullName() }}
                </v-row>
              </v-card-title>
            </v-row>
            <v-row class="mt-0">
              <v-card-subtitle class="ma-0 pa-1 pl-1">
                {{ relationshipText }}
              </v-card-subtitle>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import Person from "@/models/person.model";
import Relationship from "@/models/relationship.model";

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
    relationship: {
      type: Relationship,
      default: undefined,
    },
  },
  computed: {
    relationshipText() {
      if (this.person.id == this.personInPerspective.id) {
        return "Selected Person";
      } else {
        if (this.relationship) {
          if (this.relationship.person1Id == this.person.id) {
            return (
              this.relationship.type1 +
              " of " +
              this.personInPerspective.getPreferredName()
            );
          } else {
            return (
              this.relationship.type2 +
              " of " +
              this.personInPerspective.getPreferredName()
            );
          }
        } else {
          return (
            "No relationship to " + this.personInPerspective.getPreferredName()
          );
        }
      }
    },
  },
};
</script>
