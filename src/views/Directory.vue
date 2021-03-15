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
			<!-- <v-tooltip bottom>
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
      </v-tooltip> -->
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
						color="secondary"
						prefix="Go To Page: "
						@change="checkGoto"
					></v-text-field>
				</v-col>
				<v-col>
					<v-select
						v-model.number="size"
						color="secondary"
						item-color="secondary"
						:items="[10, 15, 25, 50, 100]"
						type="number"
						solo
						single-line
						dense
						prefix="Items Per Page: "
						@change="checkPerPage"
					></v-select>
				</v-col>
				<v-col>
					<v-select
						v-model="showFamilies"
						color="secondary"
						item-color="secondary"
						:items="[
							{ text: 'True', value: true },
							{ text: 'False', value: false },
						]"
						type="bool"
						solo
						single-line
						dense
						prefix="Display As Families: "
						@change="checkPerPage"
					></v-select>
				</v-col>
				<v-col>
					<v-select
						v-model="statusFilter"
						color="secondary"
						item-color="secondary"
						:items="
							this.showFamilies
								? this.families[0].statusOptions()
								: this.members[0].statusOptions()
						"
						solo
						single-line
						dense
						prefix="Status: "
						@change="checkPerPage"
					></v-select>
				</v-col>
			</v-row>
			<v-col>
				<v-pagination
					v-model.number="pageNumber"
					:length="pageCount"
					:total-visible="7"
					@input="nextPage"
					ref="pagin"
				></v-pagination>
			</v-col>
		</v-col>
		<v-row>
			<!-- <v-row class="justify-space-between" v-if="members.length > 0">
        <member-card
          class="ma-2"
          v-for="member in filteredData"
          :key="member.id"
          :person="member"
          @click.native="
            $router.push({ name: 'MemberView', params: { id: member.id } })
          "
        />
      </v-row> -->
			<v-row v-if="members.length > 0 && !showFamilies" no-gutters>
				<template v-for="(member, i) in filteredData">
					<v-col :key="i">
						<member-card
							class="ma-2"
							:key="member.id"
							:person="member"
							@click.native="
								$router.push({ name: 'MemberView', params: { id: member.id } })
							"
						/>
					</v-col>
					<v-responsive
						v-if="i === 2"
						:key="`width-${i}`"
						width="100%"
					></v-responsive>
				</template>
			</v-row>
			<v-row v-else-if="families.length > 0" no-gutters>
				<template v-for="(family, i) in filteredData">
					<v-col :key="i">
						<family-card
							class="ma-2"
							:key="family.id"
							:family="family"
							@click.native="
								$router.push({ name: 'FamilyView', params: { id: family.id } })
							"
						></family-card>
					</v-col>
					<v-responsive
						v-if="i === 2"
						:key="`width-${i}`"
						width="100%"
					></v-responsive>
				</template>
			</v-row>
			<v-row v-else>
				Members Not Found.
				<br />
				Please Check Your Internet Connection and Try Refreshing The Page.
			</v-row>
		</v-row>
		<admin-fab :createFunction="addUser" />
	</v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import MemberService from "@/services/memberServices";
// import rest from "@/services/RESTServices";
import MemberCard from "@/components/MemberCard.vue";
import FamilyCard from "@/components/FamilyCard.vue";
import Person from "@/models/person.model";
import Family from "@/models/family.model";

export default {
	components: {
		MemberCard,
		FamilyCard,
		AdminFab,
	},
	data() {
		return {
			pageNumber: 1, // current selected page
			size: 25, // number per page
			search: "",
			members: [],
			families: [],
			showFamilies: true,
			usePagination: true,
			statusFilter: "Active",
			test: false,
		};
	},
	computed: {
		filteredData() {
			let data = [];

			if (this.usePagination) {
				data = this.paginatedData;
			} else {
				data = this.showFamilies ? this.families : this.members;
			}

			if (this.search !== "Active" && this.search !== null) {
				data = this.showFamilies
					? data.filter(family =>
							family.name.toLowerCase().includes(this.search.toLowerCase())
					  )
					: data.filter(
							member =>
								String(member.preferredFullName())
									.toLowerCase()
									.includes(String(this.search).toLowerCase()) ||
								String(member.id)
									.toLowerCase()
									.includes(String(this.search).toLowerCase())
					  );
			}

			if (this.statusFilter !== "" && this.statusFilter !== undefined) {
				data = this.showFamilies
					? data.filter(family => family.status == this.statusFilter)
					: data.filter(member => member.status == this.statusFilter);
			}

			return data;
		},
		pageCount() {
			let l = this.showFamilies ? this.families.length : this.members.length;
			let s = this.size;
			return Math.ceil(l / s);
		},
		paginatedData() {
			const start = this.pageNumber * this.size - this.size;
			const end = start + this.size;
			return this.showFamilies
				? this.families.slice(start, end)
				: this.members.slice(start, end);
		},
	},
	methods: {
		addFamily() {
			this.$router.push({});
		},
		addUser() {
			this.$router.push({
				name: "MemberEdit",
				params: { id: 0, isAdd: true },
			});
		},
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
		if (this.$store.getters.getUserEmail === "jason.lonsinger@email.com") {
			this.test = true;
		}
		if (this.test) {
			this.members = [];
			for (let i = 0; i < 2500; i++) {
				const status = i % 3 == 0 ? "Active" : "Inactive";
				const person = new Person({
					firstName: "First",
					lastName: "Last",
					id: i,
					status,
					picture: "https://picsum.photos/200?random=" + i,
				});
				this.members.push(person);
			}

			for (let i = 0; i < 10; i++) {
				this.families.push(
					new Family({
						name: "Jennings" + i,
					})
				);
				this.families.push(
					new Family({
						name: "Lonsinger" + i,
					})
				);
				this.families.push(
					new Family({
						name: "Woodruff" + i,
						status: "Inactive",
					})
				);
				this.families.push(
					new Family({
						name: "Simpson" + i,
						status: "Disabled",
					})
				);
				this.families.push(
					new Family({
						name: "Burnett" + i,
						status: "Relocated",
					})
				);
			}
		} else {
			MemberService.getAll().then(response => {
				response.data.data.forEach(element => {
					let person = new Person(element);
					this.members.push(person);
				});
			});

			// populate families array here
			// rest.getAll("/family"),then(response => {
			//   this.families = response.data.data;
			// });

			for (let i = 0; i < 10; i++) {
				this.families.push(
					new Family({
						name: "Jennings" + i,
					})
				);
				this.families.push(
					new Family({
						name: "Lonsinger" + i,
					})
				);
				this.families.push(
					new Family({
						name: "Woodruff" + i,
						status: "Inactive",
					})
				);
				this.families.push(
					new Family({
						name: "Simpson" + i,
						status: "Disabled",
					})
				);
				this.families.push(
					new Family({
						name: "Burnett" + i,
						status: "Relocated",
					})
				);
			}
		}

		if (this.families.length <= 0) {
			this.showFamilies = false;
		}
	},
};
</script>

<style></style>
