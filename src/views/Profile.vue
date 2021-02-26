<template>
	<v-container fluid>
		<v-row>
			<v-col cols="3">
				<v-col>
					<v-img
						:src="person.picture"
						:lazy-src="require('@/assets/images/scared-batman.jpg')"
						max-height="300"
						max-width="300"
					></v-img>
				</v-col>
				<v-col>
					<v-subheader>Info</v-subheader>
					<v-divider></v-divider>
					<v-col> Phone: {{ person.maskPhoneNumber() }} </v-col>
					<v-col> Marital Status: {{ person.marital_status }}</v-col>
					<v-col> Sex: {{ person.sex }} </v-col>
				</v-col>
				<v-col v-if="!!person.skill">
					<v-col>
						<v-subheader>Skills</v-subheader>
						<v-divider></v-divider>
					</v-col>
					<v-col v-for="skill in person.skill" :key="skill.id">
						{{ skill.skill_name }}
					</v-col>
				</v-col>
			</v-col>
			<v-col lg="6">
				<v-col>
					<h1>{{ person.fullName() }}</h1>
					<v-subheader>{{ person.title }}</v-subheader>
				</v-col>
				<v-row>
					<v-col>
						<v-btn
							@click="
								$router.push({
									name: 'MemberEdit',
									params: { id: 0, isAdd: true },
								})
							"
							>Create User</v-btn
						>
					</v-col>
					<v-col>
						<v-btn>Stuff</v-btn>
					</v-col>
				</v-row>
				<v-col>
					<v-tabs v-model="tab">
						<v-tab>Public Annoucments</v-tab>
						<v-tab>Life Group Annoucments</v-tab>

						<v-tabs-items v-model="tab">
							<v-tab-item>
								<v-card flat>
									<v-card-text>Stuff here</v-card-text>
								</v-card>
							</v-tab-item>
							<v-tab-item>
								<v-card flat>
									<v-card-text>Other Stuff here</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-tabs>
				</v-col>
			</v-col>
		</v-row>

		<admin-fab :deleteFunction="confirmDelete" :editFunction="edit"></admin-fab>
		<confirmation-dialog ref="confirm"></confirmation-dialog>
	</v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import Person from "@/models/person.model";
import MemberService from "@/services/memberServices.js";

export default {
	props: ["id"],
	components: {
		AdminFab,
		ConfirmationDialog,
	},
	data() {
		return {
			tab: null,
			person: new Person({
				f_name: "Default",
				l_name: "Name",
			}),
		};
	},
	mounted() {
		MemberService.get(this.id).then((response) => {
			this.person = new Person(response.data.data);
		});
	},
	methods: {
		async confirmDelete() {
			let message = `Are your sure you want to delete: ${this.id}? This is permanent!`;

			if (
				await this.$refs.confirm.open("Confirm Delete", message, {
					color: "error",
					confirmText: "Delete",
					confirmColor: "error",
					cancelColor: "success",
				})
			) {
				this.deleteM();

				this.$router.back();
			}
		},
		deleteM() {
			console.log("THINGS");
		},
		edit() {
			this.$router.push({
				name: "MemberEdit",
				params: { id: this.id, isAdd: false },
			});
		},
	},
};
</script>

<style scoped lang="scss">
.v-subheader {
	padding-left: 0px !important;
}
</style>
