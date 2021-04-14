<template>
  <v-virtual-scroll
    :items="items"
    :item-height="itemHeight"
    :height="items.length * itemHeight"
    :max-height="isScroll ? maxHeight : ''"
    :class="isScroll ? 'overflow-y-auto' : ''"
  >
    <template v-slot="{ item }">
      <AnnouncementListItem :item="item" />
      <v-divider></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script>
import AnnouncementListItem from "@/components/AnnouncementListItem.vue";

export default {
  props: ["items"],
  data() {
    return {
      itemHeight: 150,
      maxHeight: 600,
    };
  },
  computed: {
    isScroll() {
      return this.items.length * this.itemHeight > this.maxHeight;
    },
  },
  components: {
    AnnouncementListItem,
  },
};
</script>
