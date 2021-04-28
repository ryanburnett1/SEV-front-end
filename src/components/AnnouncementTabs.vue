<template>
  <v-tabs
    v-model="tab"
    color="secondary"
    v-if="familyId > 0 || groupId > 0 || personId > 0"
  >
    <v-tab v-if="familyAnnouncements.length > 0">Family</v-tab>
    <v-tab v-if="groupAnnouncements.length > 0">Groups</v-tab>
    <v-tab v-if="personalAnnouncements.length > 0">Personal</v-tab>

    <v-tabs-items v-model="tab">
      <v-tab-item v-if="familyAnnouncements.length > 0">
        <v-card flat>
          <AnnouncementList :items="familyAnnouncements" />
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="groupAnnouncements.length > 0">
        <v-card flat>
          <AnnouncementList :items="groupAnnouncements" />
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="personalAnnouncements.length > 0">
        <v-card flat>
          <AnnouncementList :items="personalAnnouncements" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import rest from "@/services/restServices";
import AnnouncementList from "@/components/AnnouncementList.vue";

export default {
  props: ["groupId", "personId", "familyId"],
  data() {
    return {
      tab: 0,
      familyAnnouncements: [],
      groupAnnouncements: [],
      personalAnnouncements: [],
    };
  },
  components: {
    AnnouncementList,
  },
  methods: {
    isPastDate(f, c) {
      return f.setHours(0, 0, 0, 0) <= c.setHours(0, 0, 0, 0);
    },
  },
  mounted() {
    if (this.personId) {
      rest.get("/announcement/person/", this.personId).then(res => {
        this.personalAnnouncements = res.data.data;
      });
    }

    if (this.groupId) {
      rest.get("/announcement/group/", this.groupId).then(res => {
        this.groupAnnouncements = res.data.data;
      });
    }

    if (this.familyId) {
      rest.get("/announcement/family/", this.familyId).then(res => {
        this.familyAnnouncements = res.data.data;
      });
    }
  },
};
</script>

<style></style>
