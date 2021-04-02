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
import Person from "@/models/person.model";

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
    doneCallback: Function,
    maxHeight: {
      type: Number,
      default: 600,
    },
    group: {
      type: Boolean,
      default: false,
    },
    family: {
      type: Boolean,
      default: false,
    },
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
    }
  },
  computed: {
    isScroll() {
      return this.people.length * 100 > this.maxHeight;
    },
    filteredData() {
      if (this.search) {
        return this.people.filter(person =>
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
    selectAll: {
      get: function() {
        return this.people ? this.selected.length == this.people.length : false;
      },
      set: function(value) {
        let selected = [];
        if (value) {
          // this.people.forEach(person => {
          //   selected.push(person.id);
          // });
          selected = this.people.map(p => p.id);
        }

        this.selected = selected;
        this.emitSelectionChanged(this.selected);
      },
  }},
  methods: {
    done() {
      this.doneCallback(this.$refs.list.selected);
      this.dialog = false;
    },
    updateSelection(selection) {
      this.emitSelectionChanged(selection);
    },
    getGroupMembers(group) {
      //console.log(new Person());
      if (this.isGroup)
        return group.person
          .map(p => new Person(p).preferredFullName())
          .toString();
      return "";
    },
    emitSelectionChanged(event) {
      this.$emit("onSelectionChanged", event);
    },
  },
  watch: {
    // change current selection to match old
    // previousSelection: function(newVal, oldVal) {
    //   console.log("Prop changed: ", newVal, " | old: ", oldVal);
    //   this.selected = newVal;
    // },
    previousSelection: {
      immediate: true,
      handler(val, oldVal) {
        console.log("Prop changed: ", val, " | old: ", oldVal);
        this.selected = val;
      },
    },
  },
  mounted() {
    //console.log(this.people);
  },
};
</script>

<style></style>
