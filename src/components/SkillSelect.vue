<template>
  <v-autocomplete
    v-model="selected"
    :items="$store.getters.getSkillList"
    item-value="id"
    item-text="skill_name"
    multiple
    chips
    :values="personSkillList"
    deletable-chips
    label="Select Skills"
    @change="onSkillSelected"
  >
  </v-autocomplete>
</template>

<script>
// import MemberService from "@/services/memberServices";
import RESTService from "@/services/restServices";

export default {
  props: {
    personId: {
      type: Number,
      default: 0
    },
    pollDatabase: {
      type: Boolean,
      default: false
    },
    personSkillList: {
      type: Array,
      default: () => ["this is default"]
    }
  },
  data() {
    return {
      selected: []
    };
  },
  mounted() {
    if (this.pollDatabase) {
      this.$store.dispatch("retrieveSkillList");
    }

    this.selected = this.personSkillList;
  },
  methods: {
    updatePersonSkill(personId) {
      RESTService.put(`person/${personId}/skills`, { ids: this.selected });
    },
    onSkillSelected() {
      this.$emit("onSkillsChanged", this.selected);
    }
  }
};
</script>

<style></style>
