<template>
  <v-card class="mx-auto">
    <v-toolbar flat color="primary" dense>
      <v-toolbar-title class="text-body-2 font-weight-bold white--text">
        Check All
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-checkbox
          dark
          color="accent"
          class="pt-5 align-center justify-center"
          v-model="selectAll"
        ></v-checkbox>
      </v-toolbar-items>
    </v-toolbar>
    <v-virtual-scroll
      :items="people"
      item-height="77"
      :height="people.length * 77"
      :max-height="isScroll ? maxHeight : ''"
      :class="isScroll ? 'overflow-y-auto' : ''"
    >
      <template v-slot="{ item }">
        <v-list-item-group
          multiple
          v-model="selected"
          @change="emitSelectionChanged"
        >
          <v-list-item
            :value="item.id"
            :key="item.id"
            active-class="accent--text text--accent-4"
          >
            <template v-slot:default="{ active }">
              <v-list-item-avatar rounded size="60">
                <v-img :src="item.getPicturePath()"></v-img>
              </v-list-item-avatar>

              <!-- <v-list-item-subtitle v-html="'other'">
              </v-list-item-subtitle> -->

              <v-list-item-content v-if="isGroup">
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle>{{
                  getGroupMembers(item)
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content v-else-if="isFamily">
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle>{{
                  getGroupMembers(item)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-else>
                <v-list-item-title
                  v-html="item.preferredFullName()"
                ></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="accent accent-4"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import Person from "@/models/person.model";

export default {
  props: {
    people: Array,
    previousSelection: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: Number,
      default: 600,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    isFamily: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    isScroll() {
      return this.people.length * 100 > this.maxHeight;
    },
    selectAll: {
      get: function() {
        return this.people ? this.selected.length == this.people.length : false;
      },
      set: function(value) {
        let selected = [];
        if (value) {
          this.people.forEach(person => {
            selected.push(person.id);
          });
        }

        this.selected = selected;
        this.emitSelectionChanged(this.selected);
      },
    },
  },
  methods: {
    getGroupMembers(group) {
      console.log(new Person());
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
    previousSelection: function(newVal) {
      // console.log("Prop changed: ", newVal, " | old: ", oldVal);
      this.selected = newVal;
    },
  },
  mounted() {
    console.log(this.people);
  },
};
</script>

<style></style>
