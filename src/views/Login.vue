<template>
  <v-container>
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold white--text">
          Login Form:
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form" v-model="valid" lazy-validation class="ma-2 pa-2">
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          prepend-icon="mdi-email"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          required
          :type="show ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          @click:append="show = !show"
        ></v-text-field>
        <v-divider class="mb-2"></v-divider>
        <v-btn
          :disabled="!valid"
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email invalid, Try: emailName@provider.com"
      ],
      show: false,
      valid: false
    };
  },
  methods: {
    ...mapActions("account", {
      login: "login"
    }),
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style></style>
