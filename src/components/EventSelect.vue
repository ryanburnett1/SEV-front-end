<template>
  <v-select
    :items="events"
    item-value="id"
    item-text="name"
    :value="current[0]"
    clearable
    @input="onEventSelected"
  ></v-select>
</template>

<script>
import RestService from "@/services/restServices";

export default {
  props: ["current"],
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
