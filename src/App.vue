<template>
	<v-app
		id="app"
		:style="{ background: $vuetify.theme.themes[theme].background }"
	>
		<v-app-bar
			app
			dense
			color="primary"
			:dark="theme ? true : false"
			elevate-on-scroll
			elevation="24"
			hide-on-scroll
		>
			<template v-slot:img="{ props }">
				<v-img v-bind="props"> </v-img>
			</template>
			<navbar />
			<v-spacer></v-spacer>
			<account-button />
		</v-app-bar>

		<v-main id="main">
			<v-container fluid>
				<v-theme-provider root>
					<router-view :key="$route.fullPath"></router-view>
				</v-theme-provider>
			</v-container>
		</v-main>

		<!-- <v-footer app>
			<v-alert></v-alert>
		</v-footer> -->
	</v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AccountButton from "@/components/AccountButton.vue";

export default {
	name: "App",

	components: {
		Navbar,
		AccountButton,
	},
	computed: {
		theme() {
			return this.$vuetify.theme.dark ? "dark" : "light";
		},
	},
	data: () => ({}),
	mounted() {
		// this.$vuetify.theme.dark = this.$store.getters.isDarkTheme;
		this.$store.dispatch("retrieveSkillList");
	},
};
</script>

<style lang="scss" scoped>
// local theme changes here
.v-app {
}
.v-app-bar {
	// border-bottom-left-radius: 5px !important;
	// border-bottom-right-radius: 5px !important;
}
</style>


<style lang="scss">
/* global theme changes here  */
@import "~/src/assets/scss/variables.scss";
::-webkit-scrollbar {
	width: 1em;
}

::-webkit-scrollbar-track {
	-moz-box-shadow: inset 0 0 5px #12171c;
	-webkit-box-shadow: inset 0 0 5px #12171c;
	box-shadow: inset 0 0 5px #12171c;
	background: var(--v-background-base);
}

::-webkit-scrollbar-thumb {
	-moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	-webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	background: var(--v-primary-base);
	border: 1px solid var(--v-primary-darken1);
}
// .v-card {
// 	background-color: $card-background !important;
// }
</style>
