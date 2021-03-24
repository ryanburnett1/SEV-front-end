<template>
  <v-tabs v-model="tab" color="secondary">
    <v-tab>Church</v-tab>
    <v-tab>Groups</v-tab>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat v-for="ann in announcements" :key="ann.id">
          <v-card-text
            v-if="isPastDate(new Date(ann.announcementDate), new Date())"
          >
            {{ ann.description }}
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text
            >Announcements for the groups you are in are displayed displayed
            here.</v-card-text
          >
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import rest from "@/services/restServices";

export default {
  data() {
    return {
      tab: 0,
      announcements: [],
    };
  },
  methods: {
    isPastDate(f, c) {
      if (f.setHours(0, 0, 0, 0) <= c.setHours(0, 0, 0, 0)) {
        return true;
      }

      return false;
    },
  },
  mounted() {
    rest.getAll("/announcement").then(res => {
      this.announcements = res.data.data;
    });
  },
};
</script>

<style></style>
