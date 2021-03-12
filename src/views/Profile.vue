<template>
	<v-container fluid>
		<v-row>
			<v-col
				cols="2"
				xl="2"
				lg="2"
				md="2"
				sm="2"
				xs="2"
				v-if="$store.getters.isAdmin"
			>
				<v-navigation-drawer permanent expand-on-hover absolute>
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
			<v-col cols="10" xl="10" lg="10" md="10" sm="10" xs="10">
				<v-row>
					<v-col cols="1" xl="1" lg="1" md="1" sm="1" xs="1">
						<v-avatar color="primary">
							<v-img :src="person.picture"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="11" xl="11" lg="11" md="11" sm="11" xs="11">
						<h1>{{ person.preferredFullName() }}</h1>
						<v-subheader>{{ person.title }}</v-subheader>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-btn
							@click="
								$router.push({
									name: 'MemberEdit',
									params: { id, isAdd: false },
								})
							"
						>
							Edit My Info
						</v-btn>
					</v-col>
				</v-row>
				<!-- <v-row>
          <v-col>
            <v-tabs v-model="tab" color="secondary">
              <v-tab>Public Annoucments</v-tab>
              <v-tab>Life Group Annoucments</v-tab>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card flat>
                    <v-card-text
                      >Normal, church-wide announcements are displayed
                      here</v-card-text
                    >
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text
                      >Announcements specific to the groups you are in are
                      displayed here</v-card-text
                    >
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-col>
        </v-row> -->
			</v-col>
		</v-row>
		<admin-fab
			:id="id"
			:deleteFunction="confirmDelete"
			:editFunction="edit"
		></admin-fab>
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
			alert("Currently does nothing. On Purpose");
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
