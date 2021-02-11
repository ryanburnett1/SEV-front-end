<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<template v-slot:img="{ props }">
				<v-img v-bind="props"> </v-img>
			</template>
			<Navbar />
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
	name: "App",

	components: {
		Navbar,
	},

	data: () => ({
		fab: false,
	}),
};

//FAB Menu
// <v-speed-dial v-model="fab" bottom right absolute>
// 	<template v-slot:activator>
// 		<v-skeleton-loader type="button">
// 			<v-btn v-model="fab" dark fab>
// 				<v-icon v-if="fab">mdi-close</v-icon>
// 				<v-icon v-else>mdi-cog</v-icon>
// 			</v-btn>
// 		</v-skeleton-loader>
// 	</template>
// 	<v-btn>Test</v-btn>
// 	<v-btn>Other Test</v-btn>
// </v-speed-dial>
</script>
