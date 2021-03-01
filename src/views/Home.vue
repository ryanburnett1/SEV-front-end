<template>
  <v-container fluid>
    <v-row>
      <v-carousel>
        <v-carousel-item v-for="image in pictures" :key="image.id">
          <v-img :src="image.url"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-row>

    <v-row>
      <h4>Announcements</h4>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      pictures: [
        { id: 0, url: "https://picsum.photos/200/300?random=1" },
        { id: 1, url: "https://picsum.photos/200/300?random=2" },
        { id: 2, url: "https://picsum.photos/200/300?random=3" },
        { id: 3, url: "https://picsum.photos/200/300?random=4" },
        { id: 4, url: "https://picsum.photos/200/300?random=5" },
        { id: 5, url: "https://picsum.photos/200/300?random=6" },
        { id: 6, url: "https://picsum.photos/200/300?random=7" },
        { id: 7, url: "https://picsum.photos/200/300?random=8" },
        { id: 8, url: "https://picsum.photos/200/300?random=9" },
        { id: 9, url: "https://picsum.photos/200/300?random=10" }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
