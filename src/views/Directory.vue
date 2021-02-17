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
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<span v-bind="attrs" v-on="on">
						<v-switch
							v-model="usePagination"
							label="Use Pagination"
							@click="search = ''"
						></v-switch>
					</span>
				</template>
				Can be slow with a large dataset
			</v-tooltip>
		</v-row>
		<v-col v-if="usePagination">
			<v-row>
				<v-col>
					<v-text-field
						v-model.number="pageNumber"
						type="number"
						solo
						single-line
						dense
						prefix="Go To Page: "
						@change="checkGoto"
					></v-text-field>
				</v-col>
				<v-col>
					<v-select
						v-model.number="size"
						:items="[10, 15, 25, 50, 100]"
						type="number"
						solo
						single-line
						dense
						prefix="Items Per Page: "
						@change="checkPerPage"
					></v-select>
				</v-col>
			</v-row>
			<v-col>
				<v-pagination
					v-model="pageNumber"
					:length="pageCount"
					:total-visible="7"
					@input="nextPage"
					ref="pagin"
				></v-pagination>
			</v-col>
		</v-col>
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
			pageNumber: 1, // current selected page
			size: 25, // number per page
			search: "",
			members: [],
			usePagination: true,
		};
	},
	computed: {
		filteredData() {
			let data = [];

			if (this.usePagination) {
				data = this.paginatedData;
			} else {
				data = this.members;
			}

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

			return Object.freeze(data);
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
			this.pageNumber = parseInt(page);
		},
		checkPerPage() {
			this.pageNumber = 1;
		},
		checkGoto() {
			this.pageNumber = Math.max(1, Math.min(this.pageNumber, this.pageCount));
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
		Object.freeze(this.members);
	},
};
</script>

<style>
</style>