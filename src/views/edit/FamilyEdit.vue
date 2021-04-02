<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title v-if="isAdd">Add Family:</v-toolbar-title>
          <v-toolbar-title v-else>Edit Family:</v-toolbar-title>
        </v-toolbar>
        <v-form class="ma-2 pa-2" @submit.prevent="" ref="form" lazy-validation>
          <v-img
            max-height="250"
            class="mb-2"
            :src="picture"
            :lazy-src="require('@/assets/images/placeholder_gray.png')"
            contain
          ></v-img>
          <upload-pic @onFileSelected="picture = $event" ref="picker" />
          <v-row>
            <v-col>
              <ValidationProvider
                name="name"
                rules="required"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  v-model="family.name"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="Family Name"
                  type="text"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row class="mt-n6">
            <v-col>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors, valid }"
                vid="con"
              >
                <v-text-field
                  v-model="family.email"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="Email"
                  type="email"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col v-if="isAdd">
              <ValidationProvider
                name="emailConfirm"
                rules="required|confirmed:con"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  v-model="emailTemp"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="Re-Enter Email"
                  type="email"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-text-field-simplemask
            v-model="family.phone"
            color="secondary"
            label="Phone Number"
            :options="{
              inputMask: '(###) ###-####',
              outputMask: '##########',
              empty: null,
              applyAfter: false,
              alphanumeric: false,
              lowerCase: false,
            }"
          ></v-text-field-simplemask>
          <v-text-field
            v-model="family.address"
            color="secondary"
            label="Address"
            type="address"
          ></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-row class="ma-2 pa-2" justify="center">
          <v-card width="100%" tile>
            <v-card-actions class="pl-0">
              <v-card-title>Family Members:</v-card-title>
              <v-spacer></v-spacer>
              <selection-list-menu
                label="Add or Remove Family Members"
                :people="members"
                :previousSelection="ids"
                :doneCallback="test"
                @onSelectionChanged="ids = $event"
              ></selection-list-menu>
            </v-card-actions>
            <v-divider></v-divider>
            <v-container fluid>
              <v-row no-gutters>
                <v-col v-if="persons.length <= 0">No family members</v-col>
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
          </v-card>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            @click="save()"
            color="success"
            v-if="!isAdd"
            :disabled="invalid || !validated"
            >Save</v-btn
          >
          <v-btn
            @click="save()"
            color="success"
            v-else
            :disabled="invalid || !validated"
            >Create</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn @click="cancel()" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      <admin-fab :cancelFunction="cancel" :saveFunction="save"></admin-fab>
    </v-container>
  </validation-observer>
</template>

<script>
import Family from "@/models/family.model";
import Person from "@/models/person.model";
import RestService from "@/services/restServices";
import AdminFab from "@/components/AdminFab.vue";
import UploadPic from "@/components/UploadPic.vue";
import SelectionListMenu from "@/components/SelectionListMenu.vue";

// used for field validation
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  props: {
    // id of person to edit, id<=0 if creating a new user and person
    id: {
      type: Number,
      default: 0,
    },
    // is adding new user and person
    isAdd: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SelectionListMenu,
    AdminFab,
    UploadPic,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      picture: "", // gets result from UploadPic to display uploaded image as base64 string
      loading: true, // hack for v-select due to async props
      family: new Family(), // empty person for isAdd
      emailTemp: "", // used for email validation - a correct email is critical for the system
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
      // add new person
      if (this.isAdd) {
        this.family.members = [1, 2];
        await RestService.create("/family/", this.family)
          .then(res => {
            console.log("CREATED FAMILY", res);
            this.family.id = res.data.data.id;
          })
          .catch(err => {
            console.log("Failed to create new Family: ", err);
          });
      } else {
        // edit person
        console.log("Edit Persons: ", this.family.person);
        await RestService.update("/family/", this.id, this.family)
          .then(res => {
            console.log("UPDATED FAMILY", res);
          })
          .catch(err => {
            console.log("Update Family Failed: ", err);
          });
      }
      await RestService.update("/family/persons/", this.family.id, this.ids)
        .then(res => {
          console.log("UPDATED FAMILY PERSONS", res);
          this.$router.back();
        })
        .catch(err => {
          console.log("Update Family Persons Failed: ", err);
        });
      // get image to upload to db - going to change after @burnett1 changes backend code
      let picker = this.$refs.picker;
      if (picker.selectedFile) {
        const formData = new FormData();
        formData.append("file", picker.selectedFile); // appending file

        await RestService.create(
          "/family/" + this.family.id + "/picture/",
          formData
        )
          .then(res => {
            console.log("Pic Uploaded", res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  },
  async mounted() {
    RestService.getAll("/person/").then(res => {
      this.members = res.data.data.map(p => new Person(p));
    });

    if (!this.isAdd) {
      // get family info to edit
      await RestService.get("/family/", this.id).then(response => {
        this.family = new Family(response.data.data);
        this.emailTemp = this.family.email;
        this.picture = this.family.getPicturePath();
        this.loading = false; // hack for v-select
      });
      this.family.person.forEach(element => {
        this.persons.push(new Person(element));
      });
      this.ids = this.family.person.map(p => p.id);

      // call validation after info has loaded
      this.$nextTick(() => {
        this.$refs.observer.validate();
      });
    } else {
      this.loading = false; // hack for v-select - lists won't be retrived from db in time without this
    }
  },
};
</script>

<style></style>
