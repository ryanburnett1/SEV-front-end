<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container>
      <v-card>
        <v-toolbar dark color="primary" dense flat>
          <v-toolbar-title class="text-body-2 font-weight-bold white--text">
            Password Reset
          </v-toolbar-title>
        </v-toolbar>
        <v-form class="ma-2 pa-2">
          <validation-provider
            name="password"
            rules="required"
            v-slot="{ errors, valid }"
            vid="con"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              :success="valid"
              label="Password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              @click:append="show = !show"
              autofocus
            ></v-text-field>
          </validation-provider>
          <validation-provider
            name="passwordConfirm"
            rules="required|confirmed:con"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="passwordConfirm"
              :error-messages="errors"
              :success="valid"
              label="Renter Password"
              :type="showConfirm ? 'text' : 'password'"
              :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              @click:append="showConfirm = !showConfirm"
              @keydown.enter="reset()"
            ></v-text-field>
          </validation-provider>
          <v-divider class="mb-2"></v-divider>
          <v-btn
            :disabled="invalid || !validated"
            color="success"
            @click="reset()"
            >Reset</v-btn
          >
        </v-form>
      </v-card>
    </v-container>
  </validation-observer>
</template>

<script>
import rest from "@/services/restServices";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    token: {
      type: String,
      default: "",
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      show: false,
      showConfirm: false,
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    reset() {
      rest
        .create("/user/" + this.id + "/password-reset", {
          token: this.token,
          password: this.password,
        })
        .then(res => {
          console.log(res);
          console.log("add automatic login in PasswordReset.vue");

          this.$router.replace("/");
        });
    },
  },
};
</script>

<style></style>
