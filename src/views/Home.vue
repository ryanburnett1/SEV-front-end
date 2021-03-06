<template>
	<v-container fluid>
		<v-row>
			<v-img
				:src="require('@/assets/images/wilshirelogo_8x.png')"
				max-height="25vh"
				contain
			></v-img>
			<!-- <v-carousel>
				<v-carousel-item v-for="image in pictures" :key="image.id">
					<v-img :src="image.url"></v-img>
				</v-carousel-item>
			</v-carousel> -->
		</v-row>

		<v-row>
			<v-col>
				<h4>Announcements:</h4>
			</v-col>
			<v-col> </v-col>
		</v-row>
		<v-row>
			<member-selection-list
				:people="members"
				@onSelectionChanged="print"
			></member-selection-list>
		</v-row>
	</v-container>
</template>

<script>
import MemberService from "@/services/memberServices.js";
import Person from "@/models/person.model.js";
import MemberSelectionList from "../components/MemberSelectionList.vue";

export default {
	name: "Home",
	components: {
		MemberSelectionList,
	},
	data() {
		return {
			members: [],
			pictures: [
				{ id: 0, url: "https://picsum.photos/200/300?random=1" },
				{ id: 1, url: "https://picsum.photos/200/300?random=2" },
				{ id: 2, url: "https://picsum.photos/200/300?random=3" },
				{ id: 3, url: "https://picsum.photos/200/300?random=4" },
				{ id: 4, url: "https://picsum.photos/200/300?random=5" },
				{ id: 5, url: "https://picsum.photos/200/300?random=6" },
				{ id: 6, url: "https://picsum.photos/200/300?random=7" },
				{ id: 7, url: "https://picsum.photos/200/300?random=8" },
				{ id: 8, url: "https://picsum.photos/200/300?random=9" },
				{ id: 9, url: "https://picsum.photos/200/300?random=10" },
			],
		};
	},
	mounted() {
		MemberService.getAll().then(response => {
			// console.log(response.data);
			response.data.data.forEach(element => {
				let person = new Person(element);
				this.members.push(person);
			});
		});
	},
	methods: {
		print(selected) {
			console.log(selected);
		},
	},
};
</script>
