<template>
  <v-container>
    <v-card>
      <v-row
        v-for="(person, i) in group.people"
        :key="i"
        no-gutters
        style="height: 100px;"
      >
        {{ person.fullName() }}
        <v-btn icon @click="deleteMember(person.id)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-row>
    </v-card>
    <v-card  width="100%" title>
    <v-card-actions class="pl-0">
    <v-spacer></v-spacer>
    <selection-list-menu
      label="Add New Group Member"
      :people="members"
      :previousSelection="ids"
      :doneCallback="test"
      @onSelectionChanged="ids = $event"
      ></selection-list-menu>
    </v-card-actions>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="6" v-for="person in persons" :key="person.id">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 0"
              @click="
              $router.push({
                name: 'MemberView',
                params: {id: person.id},
                })"
                style = "border-radius: 0"
            >
              <v-container fluid>
                  <v-row>
                    <v-col cols="2">
                      <v-avatar color="primary">
                        <v-img
                          :src="person.getPicturePath()"
                          :lazy-src="
                            require('@/assets/images/placeholder_gray.png')
                          "
                        ></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="ma-0 pa-0 pt-2 pl-4">
                      <v-row>
                        <v-card-title>
                          <v-row>
                            {{ person.preferredFullName() }}
                          </v-row>
                        </v-card-title>
                      </v-row>
                      <v-row class="mt-0">
                        <v-card-subtitle class="ma-0 pa-1 pl-1">
                          Brother of Bob
                        </v-card-subtitle>
                      </v-row>
                      <v-row class="text-body-2 pl-4 pt-2">
                        <v-row v-if="person.address">
                          Address: {{ person.address }}
                        </v-row>
                        <v-row v-else>
                          No address is stored
                        </v-row>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <admin-fab :cancelFunction="cancel" :saveFunction="save"></admin-fab>
  </v-container>
</template>

<script>
//what do we need to display in the group-edit/display?

import Person from "@/models/person.model";
import Group from "@/models/group.model";
import GroupService from "@/services/groupServices";
import SelectionListMenu from "@/components/SelectionListMenu.vue";
import AdminFab from "@/components/AdminFab.vue";
import RestService from "@/services/restServices";

// import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    isAddGroup: {
      type: Boolean,
      default: false,
    },
    isAddPerson: {
      type: Boolean,
      default: true,
    },
  },
  components: {
      SelectionListMenu,
      AdminFab,
  },
  data() {
    return {
      //picture: "",
      loading: true,
      group: new Group(),
      persons: [],
      members: [],
      ids: [],
    };
  },
  methods: {
    test(selection) {
      this.ids = selection;
      this.persons = this.members.filter(f => selection.includes(f.id));
    },
    cancel() {
      this.$router.back();
    },
    deleteMember(personId) {
      console.log("deleting member: ", personId);
      if (this.isAddPerson) {
        console.log("personId: ", personId);
        GroupService.deletePeople(this.group.id, personId);
      } //to delete group, update with an blank array of id's
    },
    addMember(person) {
      console.log("adding member: ", person);
      GroupService.update(person);
    },
    async save() {
      if(this.isAddPerson) {
        this.group.members = [1, 2];
        await GroupService.update(this.id, this.group)
        .then(res => {
          console.log("Added to Group", res);
        })
        .catch(err => {
          console.log("Update Group Failed: ",err);
        });
      }
      await GroupService.update(this.id, this.group)

      if (this.isAddGroup) {
        GroupService.create(this.group)
          .then(response => {
            this.group = response.data.data;
            GroupService.create(this.group.id, this.formData)
              .then(() => {
                this.$router.back();
              })
              .catch(err => {
                console.log("adding new group failed: ", err);
              });
          })
          .catch(err => {
            console.log("adding new group failed: ", err);
          });
      }
    }
  },
  mounted() {
    console.log("into mounted");
    RestService.getAll("/person/").then(res => {
      this.members = res.data.data.map(p => new Person(p));
    });

    if (this.isAddPerson) {
      console.log("before getOne()");
      GroupService.getOne(this.id).then(response => {
        this.group = new Group(response.data.data);
        console.log("this is working?");

      this.ids = this.group.people.map(p => p.id);
      });
    }
  },
};
</script>
