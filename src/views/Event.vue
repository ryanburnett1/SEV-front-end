<template>
  <v-container>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card width="100%">
        <v-card-title>{{ event.name }}</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            start and end times, all day checkbox, repeat options
            <v-col cols="6"> Description: {{ user.email }} </v-col>
            announcement
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Event from "@/models/event.model";

export default {
  props: ["id"],
  data() {
    return {
      event: new Event(),
    };
  },
  mounted() {
    // get info for event
  },
};
</script>
