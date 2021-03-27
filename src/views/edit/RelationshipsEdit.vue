<template>
  <v-container>
    <p>hi</p>
    <v-text-field v-model="person.title"></v-text-field>
    <v-btn @click="testfunc"></v-btn>
  </v-container>
</template>

<script>
import Person from "@/models/person.model";
//import Person from "@/models/person.model";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      relationships: [],
      person: new Person(),
    }
  },
  methods: {
    testfunc() {
      console.log(this.person);
    }
  }
}
</script>