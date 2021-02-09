<template>
  <v-container>
      <div v-if="!$vuetify.breakpoint.mobile">
        <v-tabs>
            <v-tab
                v-for="route in $router.options.routes"
                :key="route.path"
                :to="route.path"
                v-show="showTab(route)"
            >
                {{ route.name }}
            </v-tab>
        </v-tabs>
      </div>
      <div v-else>
          Burger Menu here
      </div>
  </v-container>
</template>

<script>
export default {
    methods: {
        showTab: function(route) {
            // list of manual excludes
            if(route.name in []) return false

            // hide if meta says so in @/router/index.js
            return !route.meta.hide

        }
    }

}
</script>

<style>

</style>