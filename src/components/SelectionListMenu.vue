<template>
  <v-dialog v-model="dialog" :fullscreen="dialogProps.fullscreen">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">{{ label }}</v-btn>
    </template>
    <v-container fluid>
      <v-card>
        <!-- <v-text-field
          solo
          label="Search"
          v-model="search"
          color="white"
        ></v-text-field> -->
        <MemberSelectionList
          ref="list"
          :people="filteredData"
          :isFamily="family"
          :isGroup="group"
          :previousSelection="previousSelection"
          @onSelectionChanged="updateSelection"
        ></MemberSelectionList>

        <v-card-actions v-if="dialogProps.fullscreen">
          <v-spacer></v-spacer>
          <v-btn @click="done">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
import MemberSelectionList from "./MemberSelectionList.vue";
export default {
  props: {
    label: {
      type: String,
      default: "Select People to Send To",
    },
    people: {
      type: Array,
      default: () => [],
    },
    previousSelection: {
      type: Array,
      default: () => [],
    },
    family: Boolean,
    group: Boolean,
    doneCallback: Function,
  },
  components: { MemberSelectionList },
  data() {
    return {
      dialog: false,
      search: "",
      selected: [],

      textFieldProps: {
        label: "Select People",
        outlined: true,
      },
      dialogProps: {
        fullscreen: true,
      },
    };
  },
  computed: {
    filteredData() {
      if (this.search) {
        return this.people
        .filter(person =>
          person
            .fullName()
            .toLowerCase()
            .match(this.search.toLowerCase())
        );
      } else {
        return this.people;
      }
    },
    getSelectionData() {
      return this.selected.map(x => x.preferredFullName()).toString();
    },
  },
  methods: {
    done() {
      this.doneCallback(this.$refs.list.selected);
      this.dialog = false;
    },
    updateSelection(selection) {
      this.emitSelectionChanged(selection);
    },
    emitSelectionChanged(event) {
      this.$emit("onSelectionChanged", event);
    },
  },
  mounted() {},
};
</script>

<style></style>
