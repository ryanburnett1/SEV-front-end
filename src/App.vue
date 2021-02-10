<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <Navbar />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  })
};
</script>
