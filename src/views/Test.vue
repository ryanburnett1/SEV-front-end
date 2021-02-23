<template>
  <v-container fluid>
    <v-row>
      <v-btn @click="createPerson()"></v-btn>
    </v-row>
    <v-row>
      <confirmation-dialog ref="confirm" />
      <v-btn
        @click="
          testDialog();
          messages++;
        "
        >Delete?</v-btn
      >

      <v-badge :content="messages" :value="messages" color="green" overlap>
        <v-icon large> mdi-vuetify </v-icon>
      </v-badge>
    </v-row>

    <v-row justify>
      <member-card
        class="ma-1"
        v-for="person in members"
        :key="person.id"
        :data="person"
        @click.native="printInfo(person)"
      ></member-card>
    </v-row>
    <UploadPic @onImageUpload="imagePath = $event" />
    <v-row>
      <v-img :src="imagePath" />
      <v-btn @click="$store.dispatch('logout')">Logout</v-btn>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import MemberCard from "@/components/MemberCard.vue";
import { mapActions } from "vuex";

import UploadPic from "@/components/UploadPic.vue";
import MemberService from "@/services/memberServices.js";
import Person from "@/models/person.model.js";

export default {
  name: "Test",
  components: {
    ConfirmationDialog,
    MemberCard,
    UploadPic
  },
  data() {
    return {
      messages: 0,
      imagePath: "",
      members: [
        {
          name: "Jason",
          info: "test",
          id: "-5",
          image: "https://picsum.photos/1920/1080?random=1",
          disabled: false
        },
        {
          name: "Lane",
          info: "test",
          id: "-4",
          image: "https://picsum.photos/1920/1080?random=2",
          disabled: true
        },
        {
          name: "Nathan",
          info: "test",
          id: "-6",
          image: "https://picsum.photos/1920/1080?random=3",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        },
        {
          name: "Ryan",
          info: "test",
          id: "-69",
          image: "https://picsum.photos/1920/1080?random=4",
          disabled: false
        }
      ]
    };
  },
  methods: {
    ...mapActions("account", {
      logout: "logout"
    }),
    async testDialog() {
      let message = "";
      for (let i = 0; i < 500; i++) {
        message +=
          "Are you sure delete record: " + Math.ceil(Math.random()) + "?\n";
      }

      // get info about operation here and craft message
      if (
        await this.$refs.confirm.open("Confirm Delete", message, {
          // persistent: true,
          // noconfirm: true,
          color: "primary",
          confirmText: "Delete",
          confirmColor: "error",
          cancelColor: "success"
          // width: this.$vuetify.breakpoint.width,
        })
      ) {
        this.test(); // call function to do operation
      }
    },
    test() {
      console.log("Confirmation Confirmed From Dialog");
    },
    printInfo(person) {
      console.log(person);
    },
    createPerson() {
      let person = new Person(
        "test",
        "mctesterson",
        "333",
        "person",
        Date.now(),
        Date.now()
      );
      console.log(person);

      MemberService.create(person)
        .then(res => {
          console.log("RES: ", res);
        })
        .catch(err => {
          console.log("ERR: ", err);
        });
    }
  }
};
</script>

<style></style>
