<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="dbAnnouncementList"
        sort-by="title"
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
            <v-toolbar-title>Announcements</v-toolbar-title>
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
            <v-dialog
              v-model="dialog"
              max-width="38%"
              max-height="38%"
              persistent
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Announcement
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
                          name="title"
                          rules="required"
                          v-slot="{ errors, valid }"
                        >
                          <v-text-field
                            v-model="editedItem.title"
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
                      <v-col cols="4" xl="4" lg="4" md="4" sm="4" xs="4">
                        <v-switch
                          color="success"
                          v-model="editedItem.draft"
                          label="Mark as draft"
                        ></v-switch>
                      </v-col>
                      <v-col cols="4" xl="4" lg="4" md="4" sm="4" xs="4">
                        <v-switch
                          color="success"
                          v-model="editedItem.email"
                          label="Send Email"
                        ></v-switch>
                      </v-col>
                      <v-col cols="4" xl="4" lg="4" md="4" sm="4" xs="4">
                        <v-switch
                          color="success"
                          v-model="editedItem.sms"
                          label="Send SMS"
                        ></v-switch>
                      </v-col>
                      <!-- <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                        <v-switch
                          v-model="editedItem.reoccurring"
                          label="Announcement will repeat every set time"
                        ></v-switch>
                      </v-col> -->
                    </v-row>
                    <v-row>
                      <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                        <v-datetime-picker
                          ref="datep"
                          v-model="editedItem.announcementDate"
                          label="Select date to send announcement."
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
                        <!-- <v-col cols="6" xl="6" lg="6" md="6" sm="6" xs="6">
                        <v-datetime-picker
                          v-model="editedItem.expirationDate"
                          label="Select date to remove announcement."
                          :dateFormat="dateFormat"
                          :timeFormat="timeFormat"
                          :textFieldProps="textProps"
                          :timePickerProps="timeProps"
                          :datePickerProps="dateProps"
                        ></v-datetime-picker>
                      </v-col> -->
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <MemberSelectionList
                          :people="members"
                          @onSelectionChanged="
                            selectedMembers = $event.map(member => member.id)
                          "
                        />
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
import MemberSelectionList from "@/components/MemberSelectionList.vue";
import Person from "@/models/person.model";

export default {
  props: [],
  components: {
    ValidationObserver,
    ValidationProvider,
    MemberSelectionList,
  },
  data() {
    return {
      menu: false,
      dbAnnouncementList: [], // list of announcements fresh from db
      dialog: false, // hide/open edit/create dialog
      dialogDelete: false, // hide/open delete dialog
      editedIndex: -1, // current item we are editing locally
      // temporary storage for the item being created/edited
      editedItem: {
        title: "",
        description: "",
        draft: false,
        reoccuring: false,
        sent: false,
        email: false,
        sms: false,
        announcementDate: new Date(),
        expirationDate: new Date(),
      },
      // default info for new item - this.editItem=defaultItem when creating new announcement
      defaultItem: {
        title: "",
        description: "",
        draft: false,
        reoccuring: false,
        sent: false,
        email: false,
        sms: false,
        announcementDate: new Date(),
        expirationDate: new Date(),
      },
      search: "", // search announcements by title
      dateFormat: "MMMM do, yyyy",
      timeFormat: "hh:mma",
      // props for textfield under datetime-picker
      textProps: {
        prependIcon: "mdi-calendar",
        readonly: true,
      },
      timeProps: {
        min: this.test(), // soonest it will go out is right now
      },
      // props for date-picker under datetime-picker
      dateProps: {
        min: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24).toISOString(), // must be iso string for this part | gets yesterdays day so picker can select today
        "no-title": true,
      },

      members: [],
      groups: [],
      families: [],
      selectedMembers: [],
      selectedGroups: [],
      selectedFamilies: [],
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
      return this.editedIndex === -1 ? "New Announcement" : "Edit Announcement";
    },
    // headers for v-table
    headers() {
      return [
        {
          text: "Title",
          value: "title",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Draft",
          value: "draft",
          selection: this.checkboxFormatter,
        },
        {
          text: "Will Send Email",
          value: "email",
          selection: this.checkboxFormatter,
        },
        {
          text: "Will Send SMS",
          value: "sms",
          selection: this.checkboxFormatter,
        },
        // {
        //   text: "Reoccurring",
        //   value: "reoccurring",
        //   selection: this.checkboxFormatter,
        // },
        {
          text: "Announcement DateTime",
          value: "announcementDate",
          formatter: this.dateFormatter,
        },
        // {
        //   text: "Expiration DateTime",
        //   value: "expirationDate",
        //   formatter: this.dateFormatter,
        // },
        {
          text: "Actions",
          value: "actions",
        },
      ];
    },
  },
  methods: {
    test() {
      let picker = this.$refs.datep;
      console.log(picker);

      return new Date().toTimeString();

      // return this.$refs.datep.datetime <= new Date()
      //   ? new Date().toTimeString()
      //   : null;
    },
    checkboxFormatter(checked) {
      return checked;
    },
    // different date time format from the one used by datetime-picker | DO NOT use this.dateFormat and this.timeFormat
    dateFormatter(date) {
      return this.$moment(date).format("MMMM Do, YYYY hh:mma");
    },
    editItem(item) {
      // deep copy item we want to edit
      this.editedIndex = this.dbAnnouncementList.indexOf(item);
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
      this.editedIndex = this.dbAnnouncementList.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true; // show delete dialog
    },
    deleteItemConfirm() {
      // delete item from db and remove from local array
      RESTService.delete("/announcement/", this.editedItem.id);
      this.dbAnnouncementList.splice(this.editedIndex, 1);
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
      // if announcement is not new update
      if (this.editedIndex > -1) {
        // deep copy item and use old id to overwrite properly - !IMPORTANT FOR LOGIC CHANGING WILL BREAK, DON'T REMEBER WHY THOUGH
        let announcement = this.dbAnnouncementList[this.editedIndex];
        Object.assign(announcement, this.editedItem);

        RESTService.update(
          "/announcement/",
          announcement.id,
          announcement
        ).then(() => {
          // update people
          RESTService.put(`announcement/${announcement.id}/people`, {
            ids: this.selectedMembers,
          });
          // update groups
          RESTService.put(`announcement/${announcement.id}/groups`, {
            ids: this.selectedGroups,
          });
          // update families
          RESTService.put(`announcement/${announcement.id}/families`, {
            ids: this.selectedFamilies,
          });
        });
      } else {
        // create new announcement
        RESTService.create("/announcement", this.editedItem).then(response => {
          let annId = response.data.data.id;
          this.editedItem.id = response.data.data.id;
          // update people
          RESTService.put(`announcement/${annId}/people`, {
            ids: this.selectedMembers,
          });
          // update groups
          RESTService.put(`announcement/${annId}/groups`, {
            ids: this.selectedGroups,
          });
          // update families
          RESTService.put(`announcement/${annId}/families`, {
            ids: this.selectedFamilies,
          });
        });

        this.dbAnnouncementList.push(this.editedItem); // add to local array to display/edit
      }

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
    RESTService.getAll("/announcement").then(response => {
      // fixes formatting issues with DateTimePicker
      response.data.data.forEach(announcement => {
        announcement.announcementDate = new Date(announcement.announcementDate);
        announcement.expirationDate = new Date(announcement.expirationDate);
      });

      this.dbAnnouncementList = response.data.data;
    });

    RESTService.getAll("/person").then(response => {
      this.members = response.data.data.map(p => new Person(p));
    });
  },
};
</script>

<style lang="scss" scoped></style>
