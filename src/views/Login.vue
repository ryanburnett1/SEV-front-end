<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img
          :src="require('@/assets/images/wilshirelogo_8x.png')"
          max-height="20vh"
          contain
        ></v-img>
      </v-col>
      <v-col>
        <v-card>
          <v-toolbar dark color="primary" dense flat>
            <v-toolbar-title class="text-body-2 font-weight-bold white--text">
              Login Form:
            </v-toolbar-title>
          </v-toolbar>
          <validation-observer ref="observer" v-slot="{ invalid, validated }">
            <v-form class="ma-2 pa-2">
              <validation-provider
                name="email"
                rules="required|email"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  v-model="user.email"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="E-mail"
                  type="email"
                  prepend-icon="mdi-email"
                  @keydown.enter="$refs.passwordField.focus"
                  autofocus
                ></v-text-field>
              </validation-provider>
              <validation-provider
                name="password"
                rules="required"
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  ref="passwordField"
                  v-model="user.password"
                  color="secondary"
                  :error-messages="errors"
                  :success="valid"
                  label="Password"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-icon="mdi-lock"
                  @click:append="show = !show"
                  @keydown.enter="$refs.loginButton.$el.click"
                ></v-text-field>
              </validation-provider>
              <v-divider class="mb-2"></v-divider>
              <v-row class="ma-1 pa-1">
                <v-btn
                  ref="loginButton"
                  :disabled="invalid || !validated"
                  color="success"
                  @click="login()"
                >
                  Login
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  @click.stop="
                    validateReset();
                    dialog = true;
                  "
                >
                  Forgot Password
                </v-btn>
              </v-row>
            </v-form>
          </validation-observer>
          <validation-observer
            ref="resetobserver"
            v-slot="{ invalid, validated }"
          >
            <v-dialog v-model="dialog" persistent max-width="600px" eager>
              <v-card>
                <v-card-title>
                  <span class="headline">Reset Password</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <validation-provider
                          name="email"
                          rules="required|email"
                          v-slot="{ errors, valid }"
                        >
                          <v-text-field
                            v-model="resetEmail"
                            color="secondary"
                            :error-messages="errors"
                            :success="valid"
                            label="E-mail"
                            type="email"
                            prepend-icon="mdi-email"
                            @keydown.enter="$refs.resetButton.$el.click"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    ref="resetButton"
                    color="blue darken-1"
                    text
                    @click="
                      dialog = false;
                      sendResetRequest();
                    "
                    :disabled="invalid || !validated"
                  >
                    Send
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import rest from "@/services/restServices";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      resetEmail: "",
      show: false,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("account", {
      login: "login",
    }),
    validateReset() {
      if (this.user.email) {
        this.resetEmail = Object.assign({}, this.user).email;
        this.$nextTick(() => {
          this.$refs.resetobserver.validate();
        });
      }
    },
    sendResetRequest() {
      console.log(this.user.email);
      rest
        .create(`/user/password-reset-request`, { email: this.resetEmail })
        .then(res => {
          console.log(res);
          alert("thing sent");
        });
    },
    login() {
      this.$store.dispatch("login", {
        email: this.user.email,
        password: this.user.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
