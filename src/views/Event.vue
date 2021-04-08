<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ event.name }}
      </v-card-title>
      <v-card-subtitle>
        Location: {{ event.location }} | Date/Time:
        {{ $moment(event.startTime).format("MMMM Do, YYYY hh:mma") }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <h4>Event Description:</h4>
        <!-- <br /> -->
        {{ event.description }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import RESTService from "@/services/restServices";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    event: {},
  }),
  mounted() {
    RESTService.get("/eventInstance/", this.id).then(res => {
      this.event = res.data.data;
    });
  },
};
</script>

<style></style>
