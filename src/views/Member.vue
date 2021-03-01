<template>
  <v-container></v-container>
</template>

<script>
import Person from "@/models/person.model";
import MemberService from "@/services/memberServices";

export default {
  props: ["id"],
  data() {
    return {
      person: new Person()
    };
  },
  mounted() {
    MemberService.get(this.id).then(response => {
      this.person = response.data.data;
    });
  }
};
</script>

<style></style>
