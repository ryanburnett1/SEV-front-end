<template>
  <v-menu offset-y transition="scroll-y-transition" v-if="isLoggedIn">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-list nav>
      <v-list-item-group>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToProfilePage()">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="$store.getters.isAdmin"
          link
          @click="
            $router.push({
              name: 'MemberEdit',
              params: { id: 0, isAdd: true },
            })
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Add New Member</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="$store.getters.isAdmin"
          link
          @click="
            $router.push({
              name: 'SkillEdit',
              params: { isAdd: true },
            })
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-hard-hat</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Manage Skills</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="$store.getters.isAdmin"
          link
          @click="
            $router.push({
              name: 'EventEdit',
              params: {},
            })
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Manage Events</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="$store.getters.isAdmin"
          link
          @click="
            $router.push({
              name: 'AnnouncementEdit',
              params: {},
            })
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-bullhorn</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Manage Announcements</v-list-item-title>
        </v-list-item>
        <v-list-item @click="toggleTheme()">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Toggle Theme </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("account", {
      logout: "logout",
    }),
    toggleTheme() {
      this.$store.dispatch("toggleTheme", {
        isDark: !this.$store.getters.isDarkTheme,
      });
      this.$vuetify.theme.dark = this.$store.getters.isDarkTheme;
    },
    goToProfilePage() {
      console.log(
        "Going to Profile for user with ID: ",
        this.$store.getters.getUserId
      );

      this.$router.push({
        name: "Profile",
        params: { id: this.$store.getters.getPersonId },
      });

      // go to user profile, member self edit, whatever
    },
    logout() {
      this.$gAuth.signOut().then(res => {
        console.log(res);
      });
      this.$store.dispatch("logout");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style></style>
