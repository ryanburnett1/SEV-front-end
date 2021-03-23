<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title v-if="isAdd">Add Person:</v-toolbar-title>
          <v-toolbar-title v-else>Edit Person:</v-toolbar-title>
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
            <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
              <v-text-field
                v-model="person.title"
                color="secondary"
                label="Title (Ex: Mr., Dr.)"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
              <v-select
                v-model="person.marital_status"
                color="secondary"
                item-color="secondary"
                label="Marital Status"
                :items="person.maritalStatusOptions()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xl="2" lg="4" md="4" sm="4" xs="12">
              <ValidationProvider
                name="firstName"
                rules="required"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  v-model="person.firstName"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="First Name"
                  type="text"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" xl="2" lg="4" md="4" sm="4" xs="12">
              <ValidationProvider
                name="firstName"
                rules="required"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  v-model="person.lastName"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="Last Name"
                  type="text"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" xl="2" lg="4" md="4" sm="4" xs="12">
              <v-text-field
                v-model="person.preferredName"
                color="secondary"
                label="Preferred Name"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors, valid }"
                vid="con"
              >
                <v-text-field
                  v-model="user.email"
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
            v-model="person.phoneCell"
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
            v-model="person.address"
            color="secondary"
            label="Address"
            type="address"
          ></v-text-field>
          <ValidationProvider
            name="sex"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <v-select
              v-model="person.sex"
              color="secondary"
              item-color="secondary"
              :error-messages="errors"
              :success="valid"
              label="Gender"
              :items="person.sexOptions()"
            ></v-select>
          </ValidationProvider>
          <skill-select
            v-if="!loading"
            color="secondary"
            :id="person.id"
            :pollDatabase="false"
            :personSkillList="person.getSkillIds()"
            ref="skillSelect"
          />
          <div v-if="$store.getters.isAdmin">
            <v-select
              v-model="person.status"
              color="secondary"
              item-color="secondary"
              label="Church Status"
              :items="person.statusOptions()"
            ></v-select>
            <v-select
              v-model="user.role"
              color="secondary"
              item-color="secondary"
              label="System Role"
              :items="user.getRoles()"
            ></v-select>
          </div>
        </v-form>
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
import Person from "@/models/person.model";
import User from "@/models/user.model";
import MemberService from "@/services/memberServices";
import UserServices from "@/services/userServices";
import AdminFab from "@/components/AdminFab.vue";
import UploadPic from "@/components/UploadPic.vue";
import SkillSelect from "@/components/SkillSelect.vue";

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
    AdminFab,
    UploadPic,
    SkillSelect,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      picture: "", // gets result from UploadPic to display uploaded image as base64 string
      loading: true, // hack for v-select due to async props
      person: new Person(), // empty person for isAdd
      user: new User(null, this.person), // empty user for isAdd
      emailTemp: "", // used for email validation - a correct email is critical for the system
    };
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    async save() {
      if (this.isAdd) {
        // Add person
        await MemberService.create(this.person)
          .then(response => {
            this.$refs.skillSelect.updatePersonSkill(response.data.data.id);
            this.user.person = response.data.data;
            this.user.personId = response.data.data.id;

            UserServices.create(this.user)
              .then(() => {
                this.$router.back();
              })
              .catch(err => {
                console.log(
                  `Failed to create new User for Person: ${this.person.id}`,
                  err
                );
              });
          })
          .catch(err => {
            console.log("Failed to create new Person: ", err);
          });
      } else {
        // Edit person
        console.log(this.person);
        await MemberService.update(this.id, this.person)
          .then(() => {
            this.$refs.skillSelect.updatePersonSkill(this.id); // add/remove skills to person

            // update user info for person
            UserServices.update(this.user.id, this.user)
              .then(() => {
                this.$router.back();
              })
              .catch(err => {
                console.log("Update User Failed: ", err);
              });
          })
          .catch(err => {
            console.log("Update Person Failed: ", err);
          });
      }
      let selectedFile = this.$refs.picker.selectedFile;
      if (selectedFile) {
        await MemberService.uploadImage(this.user.personId, selectedFile)
          .then(res => {
            console.log("Upload image resolved", res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    if (!this.isAdd) {
      // get person info to edit
      UserServices.getByPerson(this.id).then(response => {
        this.user = new User(response.data.data[0]);
        this.emailTemp = this.user.email;
      });
      MemberService.get(this.id).then(response => {
        this.person = new Person(response.data.data);
        this.picture = this.person.getPicturePath();
        this.loading = false; // hack for v-select
      });

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
