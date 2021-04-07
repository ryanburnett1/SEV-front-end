<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="dbEventList"
        sort-by="name"
        class="elevation-1"
      >
        <template
          v-for="(header, index) in headers.filter(
            header =>
              header.hasOwnProperty('formatter') ||
              header.hasOwnProperty('selection')
          )"
          v-slot:[`item.${header.value}`]="{ value }"
        >
          <div v-if="header.selection" :key="index">
            <v-simple-checkbox disabled :value="value"></v-simple-checkbox>
          </div>
          <div v-else :key="index">
            {{ header.formatter(value) }}
          </div>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Events</v-toolbar-title>
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
                  New Event
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
                        <v-text-field
                          v-model="editedItem.location"
                          color="secondary"
                          label="Event Location"
                          filled
                          maxlength="255"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-datetime-picker
                          ref="datep"
                          v-model="editedItem.startTime"
                          label="Select Event Starting Date/Time."
                          :dateFormat="dateFormat"
                          :timeFormat="timeFormat"
                          :textFieldProps="textProps"
                          :timePickerProps="timeProps"
                          :datePickerProps="dateProps"
                          @update="test()"
                        >
                          <template v-slot:dateIcon>
                            <v-icon>mdi-calendar</v-icon>
                          </template>
                          <template v-slot:timeIcon>
                            <v-icon>mdi-clock</v-icon>
                          </template>
                        </v-datetime-picker>
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
      dbEventList: [], // list of events fresh from db
      dialog: false, // hide/open edit/create dialog
      dialogDelete: false, // hide/open delete dialog
      editedIndex: -1, // current item we are editing locally
      editedItem: {
        name: "",
        description: "",
        location: "",
        startTime: new Date(),
        endTime: new Date(),
        isAllDay: false,
      }, // temporary storage for the item being created/edited
      // default info for new item - this.editItem=defaultItem when creating new event
      defaultItem: {
        name: "",
        description: "",
        location: "",
        startTime: new Date(),
        endTime: new Date(),
        isAllDay: false,
      },
      search: "", // search events by name
    };
  },
  computed: {
    minTime() {
      return this.$refs.datep.datetime <= new Date()
        ? new Date().toTimeString()
        : null;
    },
    // sets title of create/edit form
    formTitle() {
      return this.editedIndex === -1 ? "New Event" : "Edit Event";
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
          text: "Location",
          value: "location",
        },
        {
          text: "Start DateTime",
          value: "startTime",
          formatter: this.dateFormatter,
        },
        {
          text: "Actions",
          value: "actions",
        },
      ];
    },
  },
  methods: {
    // different date time format from the one used by datetime-picker | DO NOT use this.dateFormat and this.timeFormat
    dateFormatter(date) {
      return this.$moment(date).format("MMMM Do, YYYY hh:mma");
    },
    test() {
      let picker = this.$refs.datep;
      console.log(picker);

      return new Date().toTimeString();

      // return this.$refs.datep.datetime <= new Date()
      //   ? new Date().toTimeString()
      //   : null;
    },
    editItem(item) {
      // deep copy item we want to edit
      this.editedIndex = this.dbEventList.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true; // show edit dialog

      // ensure validation doesn't trigger with an error too early
      if (this.editedIndex > -1) {
        this.$nextTick(() => {
          this.$refs.observer.validate();
        });
      }
    },
    deleteItem(item) {
      // get item we want to delete
      this.editedIndex = this.dbEventList.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true; // show delete dialog
    },
    deleteItemConfirm() {
      // delete item from db and remove from local array
      RESTService.delete("/eventInstance/", this.editedItem.id);
      this.dbEventList.splice(this.editedIndex, 1);
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
      // if event is not new update
      if (this.editedIndex > -1) {
        // deep copy item and use old id to overwrite properly - !IMPORTANT FOR LOGIC CHANGING WILL BREAK, DON'T REMEBER WHY THOUGH
        let event = this.dbEventList[this.editedIndex];
        Object.assign(event, this.editedItem);

        RESTService.update("/eventInstance/", event.id, event);
      } else {
        // create new event
        RESTService.create("/eventInstance", this.editedItem).then(response => {
          this.editedItem.id = response.data.data.id;
        });

        this.dbEventList.push(this.editedItem); // add to local array to display/edit
      }

      // this.$store.dispatch("retrieveSkillList"); // update global list of events
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
    RESTService.getAll("/eventInstance").then(response => {
      this.dbEventList = response.data.data;
    });
  },
};
</script>

<style></style>
