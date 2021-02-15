<template>
	<v-container>
		<v-row><h3>Member Directory:</h3></v-row>
		<v-row class="justify-space-between">
			<member-card
				class="mb-4"
				v-for="member in members"
				:key="member.id"
				:data="member"
				@click.native="
					$router.push({ name: 'MemberView', params: { id: member.id } })
				"
			/>
		</v-row>
		<!-- <v-row v-else> Problem Here </v-row> -->
	</v-container>
</template>

<script>
import MemberCard from "../components/MemberCard.vue";
// import axios from "axios";

export default {
	components: {
		MemberCard,
	},
	data() {
		return {
			members: [
				{
					name: "Jason",
					info: "test",
					id: "-5",
					image: "https://picsum.photos/1920/1080?random=1",
					disabled: false,
				},
				{
					name: "Lane",
					info: "test",
					id: "-4",
					image: "https://picsum.photos/1920/1080?random=2",
					disabled: true,
				},
				{
					name: "Nathan",
					info: "test",
					id: "-6",
					image: "https://picsum.photos/1920/1080?random=3",
					disabled: false,
				},
				{
					name: "Ryan",
					info: "test",
					id: "-69",
					image: "https://picsum.photos/1920/1080?random=4",
					disabled: false,
				},
			],
		};
	},
	methods: {},
	mounted() {
		// axios.get();
	},
};
</script>

<style>
</style>