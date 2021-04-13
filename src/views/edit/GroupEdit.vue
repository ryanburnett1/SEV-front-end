<template>
  <v-container>
    <v-card>
      <v-row
        v-for="person in group.people"
        :key="person.id"
        no-gutters
        style="height: 100px;"
      >
        {{ person.fullName() }}
      </v-row>
    </v-card>
    <v-card width="100%" title>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              color="secondary"
              label="Group Name"
              v-model="group.name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-card-actions class="pl-0">
              <v-spacer></v-spacer>
              <SelectionListModal
                label="Add/Remove Group Members"
                :people="members"
                :previousSelection="ids"
                :doneCallback="test"
                @onSelectionChanged="ids = $event"
              ></SelectionListModal>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" v-for="person in persons" :key="person.id">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 6 : 0"
                @click="
                  $router.push({
                    name: 'MemberView',
                    params: { id: person.id },
                  })
                "
                style="border-radius: 0"
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
      <v-card-actions>
        <v-btn @click="save()" color="success">Save</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="cancel()" color="error">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
//what do we need to display in the group-edit/display?

import Person from "@/models/person.model";
import Group from "@/models/group.model";
import GroupService from "@/services/groupServices";
import RestService from "@/services/restServices";
import SelectionListModal from "@/components/SelectionListModal.vue";

// import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SelectionListModal,
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
    async save() {
      if (this.isAdd) {
        GroupService.create(this.group).then(res => {
          GroupService.updatePeople(res.data.data.id, this.ids).then(() => {
            this.$router.go(-1);
          });
        });
      } else {
        GroupService.update(this.group.id, this.group)
          .then(() => {
            GroupService.updatePeople(this.id, this.ids).then(() => {
              this.$router.go(-1);
            });
          })
          .catch(err => {
            console.log("Update Group Failed: ", err);
          });
        // await GroupService.update(this.id, this.group);
      }
    },
  },
  mounted() {
    console.log("into mounted");
    RestService.getAll("/person/").then(res => {
      this.members = res.data.data.map(p => new Person(p));
    });

    if (!this.isAdd) {
      GroupService.get(this.id).then(response => {
        this.group = new Group(response.data.data);
        this.ids = this.group.person.map(p => p.id);
        this.persons = this.group.person
          .filter(p => this.ids.includes(p.id))
          .map(p => new Person(p));
      });
    }
  },
};
</script>
