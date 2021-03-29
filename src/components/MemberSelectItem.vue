<template>
  <v-card
      style="border-radius: 0"
      width="100%"
      class="pa-0"
    >
        
          <v-col align="left" justify="left">
            <v-row>
              <v-avatar color="primary">
                <v-img
                  :src="person.getPicturePath()"
                  :lazy-src="
                    require('@/assets/images/placeholder_gray.png')
                  "
                ></v-img>
              </v-avatar>
              <v-card-title vertical-align="center">
                {{ person.preferredFullName() }}
              </v-card-title>
            </v-row>
          </v-col>
          
       
    </v-card>
</template>

<script>
import Person from "@/models/person.model";

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
  },
};
</script>

<style></style>
