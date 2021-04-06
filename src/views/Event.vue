<template>
  <v-container fluid>
    {{ id }}
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
