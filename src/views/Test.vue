<template>
  <v-container fluid>
    <v-row>
      <member-selection-list
        :people="members"
        @onSelectionChanged="print"
      ></member-selection-list>
    </v-row>
  </v-container>
</template>

<script>
import MemberService from "@/services/memberServices.js";
import Person from "@/models/person.model.js";
import MemberSelectionList from "../components/MemberSelectionList.vue";

export default {
  name: "Test",
  components: {
    MemberSelectionList,
  },
  data() {
    return {
      members: [],
    };
  },
  mounted() {
    MemberService.getAll().then(response => {
      console.log(response.data);
      response.data.data.forEach(element => {
        let person = new Person(element);
        Object.freeze(person);
        this.members.push(person);
      });
      Object.freeze(this.members);
    });
  },
  methods: {
    print(selected) {
      console.log(selected);
    },
  },
};
</script>

<style></style>
