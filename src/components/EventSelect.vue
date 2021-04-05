<template>
  <v-select :items="events" item-value="id" item-text="name" @></v-select>
</template>

<script>
import RestService from "@/services/restServices";

export default {
  data: () => ({
    events: [],
  }),
  methods: {
    onEventSelected(event) {
      this.$emit("onEventSelected", event);
    },
  },
  mounted() {
    RestService.getAll("/eventInstance/").then(response => {
      this.events = response.data.data;
      // console.log(response.data.data);
      // this.events = response.data.data.filter(
      //   e => Date.parse(e.endTime).toString() < Date.now().toString()
      // );
      // console.log("This: ", this.events);
    });
  },
};
</script>

<style></style>
