<template>
	<v-container>
		<v-row><h3>Member Directory:</h3></v-row>
		<v-row>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Search"
				outlined
			></v-text-field>
		</v-row>
		<v-row class="justify-space-between" v-if="members.length > 0">
			<member-card
				class="ma-2"
				v-for="member in filteredData"
				:key="member.id"
				:data="member"
				@click.native="
					$router.push({ name: 'MemberView', params: { id: member.id } })
				"
			/>
			<v-pagination
				v-model="pageNumber"
				:length="pageCount"
				@input="nextPage"
			></v-pagination>
		</v-row>
		<v-row v-else>
			Members Not Found.
			<br />
			Please Check Your Internet Connection and Try Refreshing The Page.
		</v-row>
	</v-container>
</template>

<script>
import MemberCard from "@/components/MemberCard.vue";
// import MemberService from "../services/memberServices.js";

export default {
	components: {
		MemberCard,
	},
	data() {
		return {
			pageNumber: 0, // current selected page
			size: 10, // number per page
			search: "",
			members: [
				// {
				// 	name: "Jason",
				// 	info:
				// 		"Subtly charming reader. Troublemaker. Social media fan. Total pop culture expert.",
				// 	id: "-5",
				// 	image: "https://picsum.photos/1920/1080?random=1",
				// 	disabled: false,
				// },
				// {
				// 	name: "Lane",
				// 	info:
				// 		"Communicator. Hipster-friendly web fanatic. Coffee aficionado. Tv advocate. Proud beer fan. Reader.",
				// 	id: "-4",
				// 	image: "https://picsum.photos/1920/1080?random=2",
				// 	disabled: true,
				// },
				// {
				// 	name: "Nathan",
				// 	info:
				// 		"Explorer. Zombie junkie. Analyst. Wannabe writer. Food trailblazer. Devoted pop culture aficionado.",
				// 	id: "-6",
				// 	image: "https://picsum.photos/1920/1080?random=3",
				// 	disabled: false,
				// },
				// {
				// 	name: "Ryan",
				// 	info:
				// 		"Music specialist. Social media expert. Alcohol fan. Travel fanatic. Student. Web advocate.",
				// 	id: "-69",
				// 	image: "https://picsum.photos/1920/1080?random=4",
				// 	disabled: false,
				// },
			],
		};
	},
	computed: {
		filteredData() {
			let data = this.paginatedData;

			if (this.search !== null) {
				data = data.filter(
					(member) =>
						String(member.name)
							.toLowerCase()
							.includes(String(this.search).toLowerCase()) ||
						String(member.info)
							.toLowerCase()
							.includes(String(this.search).toLowerCase())
				);
			}

			return data;
		},
		pageCount() {
			let l = this.members.length;
			let s = this.size;
			return Math.ceil(l / s);
		},
		paginatedData() {
			const start = this.pageNumber * this.size - this.size;
			const end = start + this.size;
			return this.members.slice(start, end);
		},
	},
	methods: {
		nextPage(page) {
			this.pageNumber = page;
		},
	},
	mounted() {
		// MemberService.getAll().then((Response) => {
		// 	this.members = Response.data;
		// });
		this.members = [];
		for (let i = 0; i < 2500; i++) {
			this.members.push({
				name: i,
				id: i,
				info: i,
				disabled: false,
				image: "https://picsum.photos/1920/1080?random=" + i,
			});
		}

		console.log(this.members);
	},
};
</script>

<style>
</style>