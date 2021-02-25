<template>
	<v-app>
		<v-app-bar
			app
			dense
			color="primary"
			dark
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

		<v-main>
			<v-container fluid>
				<router-view></router-view>
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

	data: () => ({}),
	mounted() {
		this.$store.dispatch("retrieveSkillList");
		// console.log("Stuff: ", this.$store.getters.getSkillList);
	},
};
</script>

<style lang="scss" scoped>
.v-app-bar {
	// border-bottom-left-radius: 5px !important;
	// border-bottom-right-radius: 5px !important;
}
</style>
