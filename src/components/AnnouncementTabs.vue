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
          <v-virtual-scroll
            :items="familyAnnouncements"
            :item-height="itemHeight"
            :height="familyAnnouncements.length * itemHeight"
            :max-height="isScrollFamily ? maxHeight : ''"
            :class="isScrollFamily ? 'overflow-y-auto' : ''"
          >
            <template v-slot="{ item }">
              <v-list-item
                :key="item.id"
                active-class="accent--text text--accent-4"
                link
              >
                <v-list-item-avatar rounded size="60" v-if="item.picture">
                  <v-img :src="item.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                  {{ item.description }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="groupAnnouncements.length > 0">
        <v-card flat>
          <v-virtual-scroll
            :items="groupAnnouncements"
            :item-height="itemHeight"
            :height="groupAnnouncements.length * itemHeight"
            :max-height="isScrollGroup ? maxHeight : ''"
            :class="isScrollGroup ? 'overflow-y-auto' : ''"
          >
            <template v-slot="{ item }">
              <v-list-item
                :key="item.id"
                active-class="accent--text text--accent-4"
                link
              >
                <v-list-item-avatar rounded size="60" v-if="item.picture">
                  <v-img :src="item.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                  {{ item.description }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="personalAnnouncements.length > 0">
        <v-card flat>
          <v-virtual-scroll
            :items="personalAnnouncements"
            :item-height="itemHeight"
            :height="personalAnnouncements.length * itemHeight"
            :max-height="isScrollPersonal ? maxHeight : ''"
            :class="isScrollPersonal ? 'overflow-y-auto' : ''"
          >
            <template v-slot="{ item }">
              <v-list-item
                :key="item.id"
                active-class="accent--text text--accent-4"
                link
              >
                <v-list-item-avatar rounded size="60" v-if="item.picture">
                  <v-img :src="item.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                  {{ item.description }}
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import rest from "@/services/restServices";

export default {
  props: ["groupId", "personId", "familyId"],
  data() {
    return {
      tab: 0,
      itemHeight: 77,
      maxHeight: 600,
      familyAnnouncements: [],
      groupAnnouncements: [],
      personalAnnouncements: [],
    };
  },
  computed: {
    isScrollPersonal() {
      return (
        this.personalAnnouncements.length * this.itemHeight > this.maxHeight
      );
    },
    isScrollFamily() {
      return this.familyAnnouncements.length * this.itemHeight > this.maxHeight;
    },
    isScrollGroup() {
      return this.groupAnnouncements * this.itemHeight > this.maxHeight;
    },
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
    rest.get("/announcement/person/", this.personId).then(res => {
      this.personalAnnouncements = res.data.data;
    });

    rest.get("/announcement/group/", this.groupId).then(res => {
      this.groupAnnouncements = res.data.data;
    });

    rest.get("/announcement/family/", this.familyId).then(res => {
      this.familyAnnouncements = res.data.data;
    });
  },
};
</script>

<style></style>
