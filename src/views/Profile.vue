<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10" xl="10" lg="10" md="10" sm="10" xs="10">
        <v-row>
          <v-col cols="1" xl="1" lg="1" md="1" sm="1" xs="1">
            <v-avatar color="primary">
              <v-img :src="person.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="11" xl="11" lg="11" md="11" sm="11" xs="11">
            <h1>{{ person.preferredFullName() }}</h1>
            <v-subheader>{{ person.title }}</v-subheader>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              @click="
                $router.push({
                  name: 'MemberEdit',
                  params: { id, isAdd: false },
                })
              "
            >
              Edit My Info
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Announcements:</h2>
            <announcement-tabs
              :personId="$store.getters.getPersonId"
              :groupId="$store.getters.getGroupId"
              :familyId="$store.getters.getFamilyId"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <admin-fab
      :id="id"
      :deleteFunction="confirmDelete"
      :editFunction="edit"
    ></admin-fab>
    <confirmation-dialog ref="confirm"></confirmation-dialog>
  </v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import Person from "@/models/person.model";
import MemberService from "@/services/memberServices.js";
import AnnouncementTabs from "@/components/AnnouncementTabs.vue";

export default {
  props: ["id"],
  components: {
    AdminFab,
    ConfirmationDialog,
    AnnouncementTabs,
  },
  data() {
    return {
      tab: null,
      person: new Person({
        firstName: "Default",
        lastName: "Name",
      }),
    };
  },
  mounted() {
    MemberService.get(this.id).then(response => {
      this.person = new Person(response.data.data);
    });
  },
  methods: {
    async confirmDelete() {
      let message = `Are your sure you want to delete: ${this.id}? This is permanent!`;

      if (
        await this.$refs.confirm.open("Confirm Delete", message, {
          color: "error",
          confirmText: "Delete",
          confirmColor: "error",
          cancelColor: "success",
        })
      ) {
        this.deleteM();

        this.$router.back();
      }
    },
    deleteM() {
      alert("Currently does nothing. On Purpose");
    },
    edit() {
      this.$router.push({
        name: "MemberEdit",
        params: { id: this.id, isAdd: false },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.v-subheader {
  padding-left: 0px !important;
}

.v-expansion-panels {
  .v-expansion-panel {
    .v-expansion-panel-header {
      padding-left: 0% !important;
      padding-right: 0% !important;
    }

    .v-expansion-panel-content {
      padding-left: 0% !important;
      padding-right: 0% !important;
    }
  }
}
</style>
