<template>
  <validation-observer ref="observer" v-slot="{ invalid, validated }">
    <v-container>
      <v-card>
        <v-toolbar dark color="primary" dense flat>
          <v-toolbar-title class="text-body-2 font-weight-bold white--text">
            Login Form:
          </v-toolbar-title>
        </v-toolbar>
        <v-form class="ma-2 pa-2">
          <validation-provider name="email" rules="required|email" v-slot="{ errors, valid }">
            <v-text-field
              v-model="user.email"
              :error-messages="errors"
              :success="valid"
              label="E-mail"
              type="email"
              prepend-icon="mdi-email"
            ></v-text-field>
          </validation-provider>
          <validation-provider name="password" rules="required" v-slot="{ errors, valid }">
            <v-text-field
              v-model="user.password"
              :error-messages="errors"
              :success="valid"
              label="Password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              @click:append="show = !show"
            ></v-text-field>
          </validation-provider>
          <v-divider class="mb-2"></v-divider>
          <v-btn
            :disabled="invalid || !validated"
            color="success"
            @click="
              $store.dispatch('login', {
                email: user.email,
                password: user.password
              })
            "
            >Login</v-btn
          >
        </v-form>
      </v-card>
    </v-container>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      show: false
    };
  },
  methods: {
    ...mapActions("account", {
      login: "login"
    })
  }
};
</script>

<style></style>
