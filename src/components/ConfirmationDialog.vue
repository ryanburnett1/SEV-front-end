<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    :persistent="options.persistent"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" dark v-html="message"></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.noconfirm"
          :color="!!options.cancelColor ? options.cancelColor : 'error'"
          text
          class="body-2 font-weight-bold"
          @click.native="cancel"
          >{{ options.cancelText }}</v-btn
        >
        <v-btn
          :color="!!options.confirmColor ? options.confirmColor : 'success'"
          class="body-2 font-weight-bold"
          outlined
          @click.native="confirm"
        >
          {{ options.confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "white lighten-2",
        width: 400,
        zIndex: 200,
        noconfirm: false,
        cancelText: "Cancel",
        cancelColor: "error",
        confirmText: "Confirm",
        confirmColor: "success",
        persistent: false,
      },
    };
  },
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>

<style></style>
