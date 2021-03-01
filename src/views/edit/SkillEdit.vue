<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="dbSkillList"
        sort-by="skill_name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Skills</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
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
                            v-model="editedItem.skill_name"
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
      dbSkillList: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: { skill_name: "", description: "" },
      defaultItem: {
        skill_name: "",
        description: "",
      },
      search: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Skill" : "Edit Skill";
    },
    headers() {
      return [
        {
          text: "Name",
          value: "skill_name",
        },
        {
          text: "Description",
          value: "description",
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
      this.editedIndex = this.dbSkillList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      if (this.editedIndex > -1) {
        this.$nextTick(() => {
          this.$refs.observer.validate();
        });
      }
    },
    deleteItem(item) {
      this.editedIndex = this.dbSkillList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      RESTService.delete("/skill/", this.editedItem.id);
      this.dbSkillList.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        let skill = this.dbSkillList[this.editedIndex];
        Object.assign(skill, this.editedItem);
        RESTService.update("/skill/", skill.id, skill);
      } else {
        RESTService.create("/skill", this.editedItem).then(response => {
          this.editedItem.id = response.data.data.id;
        });

        this.dbSkillList.push(this.editedItem);
      }
      this.close();
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    RESTService.getAll("/skill").then(response => {
      this.dbSkillList = response.data.data;
    });
  },
};
</script>

<style></style>
