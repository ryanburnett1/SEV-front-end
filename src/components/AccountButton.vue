<template>
	<v-menu offset-y transition="scroll-y-transition" v-if="isLoggedIn">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>
		<v-list nav>
			<v-list-item-group>
				<v-list-item @click="$store.dispatch('logout')">
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
				<!-- <v-list-item @click="toggleTheme()">
					<v-list-item-icon>
						<v-icon>mdi-theme-light-dark</v-icon>
					</v-list-item-icon>
					<v-list-item-title> Togle Theme </v-list-item-title>
				</v-list-item> -->
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
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.$store.dispatch("toggleTheme", this.$vuetify.theme.dark);
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
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
	},
};
</script>

<style></style>
