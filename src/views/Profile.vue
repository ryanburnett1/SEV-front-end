<template>
	<v-container fluid>
		<v-row>
			<v-col :cols="$vuetify.breakpoint.mdAndUp ? 3 : 1">
				<v-navigation-drawer
					v-model="open"
					:permanent="$vuetify.breakpoint.mdAndUp"
					absolute
				>
					<v-list dense>
						<v-list-item dense flat>
							<v-btn
								v-if="$vuetify.breakpoint.smAndDown"
								@click="open = !open"
								fixed
								right
								flat
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-list-item>
						<v-list-item class="px-2">
							<v-list-item-avatar>
								<v-img
									:src="person.picture"
									:lazy-src="require('@/assets/images/scared-batman.jpg')"
								></v-img>
							</v-list-item-avatar>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title class="title">
									{{ person.fullName() }}
								</v-list-item-title>
								<!-- <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle> -->
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-expansion-panels accordion>
									<v-expansion-panel>
										<v-expansion-panel-header>Info</v-expansion-panel-header>
										<v-expansion-panel-content>
											<v-row> Phone: {{ person.maskPhoneNumber() }} </v-row>
											<v-row>
												Marital Status: {{ person.marital_status }}</v-row
											>
											<v-row> Sex: {{ person.sex }} </v-row>
										</v-expansion-panel-content>
									</v-expansion-panel>
									<v-expansion-panel
										v-if="!!person.skill && person.skill.length > 0"
									>
										<v-expansion-panel-header>Skills</v-expansion-panel-header>
										<v-expansion-panel-content>
											<div v-for="skill in person.skill" :key="skill.id">
												{{ skill.name }}
											</div>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-list-item-content>
						</v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list nav dense>
						<v-list-item
							link
							@click="
								$router.push({
									name: 'MemberEdit',
									params: { id: 0, isAdd: true },
								})
							"
						>
							<v-list-item-icon>
								<v-icon>mdi-account-multiple-plus</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Add New Member</v-list-item-title>
						</v-list-item>

						<v-list-item
							link
							@click="
								$router.push({
									name: 'SkillEdit',
									params: { isAdd: true },
								})
							"
						>
							<v-list-item-icon>
								<v-icon>mdi-hard-hat</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Add Skill</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
			</v-col>
			<v-col>
				<v-btn v-if="$vuetify.breakpoint.smAndDown" @click="open = !open"
					>Open Side Menu</v-btn
				>
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
				firstName: "Default",
				lastName: "Name",
			}),
			open: false,
		};
	},
	mounted() {
		MemberService.get(this.id).then(response => {
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

.v-expansion-panels {
	.v-expansion-panel {
		.v-expansion-panel-header {
			padding-left: 0% !important;
			padding-right: 0% !important;
		}

		.v-expansion-panel-content {
			padding-left: 0% !important;
			padding-right: 0% !important;
		}
	}
}
</style>
