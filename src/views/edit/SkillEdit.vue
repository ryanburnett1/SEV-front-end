<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="dbSkillList"
        sort-by="['name', 'serviceSkill']"
        class="elevation-1"
        multi-sort
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Skills</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              color="secondary"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="38%" max-height="38%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Skill
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <validation-provider
                          name="name"
                          rules="required"
                          v-slot="{ errors, valid }"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            color="secondary"
                            :error-messages="errors"
                            :success="valid"
                            label="Name"
                            filled
                            maxlength="255"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <validation-provider
                          name="description"
                          rules="required"
                          v-slot="{ errors, valid }"
                        >
                          <v-textarea
                            v-model="editedItem.description"
                            color="secondary"
                            :error-messages="errors"
                            :success="valid"
                            label="Description"
                            rows="4"
                            auto-grow
                            filled
                            counter
                            maxlength="255"
                          ></v-textarea>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-switch
                          v-model="editedItem.serviceSkill"
                          color="success"
                          label="Service Skill"
                          inset
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :disabled="invalid || !validated"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.serviceSkill ="{ item }">
          {{ getServiceSkill(item) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> No Data </template>
      </v-data-table>
    </v-container>
  </validation-observer>
</template>

<script>
import RESTService from "@/services/restServices";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  props: [],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      dbSkillList: [], // list of skills fresh from db
      dialog: false, // hide/open edit/create dialog
      dialogDelete: false, // hide/open delete dialog
      editedIndex: -1, // current item we are editing locally
      editedItem: { name: "", description: "", serviceSkill: false }, // temporary storage for the item being created/edited
      // default info for new item - this.editItem=defaultItem when creating new skill
      defaultItem: {
        name: "",
        description: "",
        serviceSkill: false,
      },
      search: "", // search skills by name
    };
  },
  computed: {
    // sets title of create/edit form
    formTitle() {
      return this.editedIndex === -1 ? "New Skill" : "Edit Skill";
    },
    // headers for v-table
    headers() {
      return [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Service Skill",
          value: "serviceSkill"
        },
        {
          text: "Actions",
          value: "actions",
        },
      ];
    },
  },
  methods: {
    editItem(item) {
      // deep copy item we want to edit
      this.editedIndex = this.dbSkillList.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true; // show edit dialog

      // ensure validation doesn't trigger with an error too early
      if (this.editedIndex > -1) {
        this.$nextTick(() => {
          this.$refs.observer.validate();
        });
      }
    },
    getServiceSkill(item){
      let result = "ERROR";
      if(item.serviceSkill){
        result = "✔️"
      }
      else {
        result = "❌"
      }
      return result;
    },
    deleteItem(item) {
      // get item we want to delete
      this.editedIndex = this.dbSkillList.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true; // show delete dialog
    },
    deleteItemConfirm() {
      // delete item from db and remove from local array
      RESTService.delete("/skill/", this.editedItem.id);
      this.dbSkillList.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;

      // lose reference to old item, so we don't accidentlly overwrite the wrong item in list
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;

      // lose reference to old item, so we don't accidentlly overwrite the wrong item in list
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      // if skill is not new update
      if (this.editedIndex > -1) {
        // deep copy item and use old id to overwrite properly - !IMPORTANT FOR LOGIC CHANGING WILL BREAK, DON'T REMEBER WHY THOUGH
        let skill = this.dbSkillList[this.editedIndex];
        Object.assign(skill, this.editedItem);

        RESTService.update("/skill/", skill.id, skill);
      } else {
        // create new skill
        RESTService.create("/skill", this.editedItem).then(response => {
          this.editedItem.id = response.data.data.id;
        });

        this.dbSkillList.push(this.editedItem); // add to local array to display/edit
      }

      this.$store.dispatch("retrieveSkillList"); // update global list of skills
      this.close(); // close dialog
    },
  },
  watch: {
    // call close for create/edit dialog
    dialog(val) {
      val || this.close();
    },
    // call close for create/edit dialog
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    // get list of skils from db
    RESTService.getAll("/skill").then(response => {
      this.dbSkillList = response.data.data;
      console.log(this.dbSkillList);
    });
  },
};
</script>

<style></style>
