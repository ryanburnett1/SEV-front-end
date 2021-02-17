<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-card>
					<v-toolbar>
						<v-toolbar-title>{{ profile.fullName() }}</v-toolbar-title>
					</v-toolbar>
					<v-card-title>this</v-card-title>
					<v-card-subtitle>is</v-card-subtitle>
					<v-card-text>a test</v-card-text>
				</v-card>
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
			profile: new Person({
				f_name: "test",
				l_name: "fdd",
			}),
		};
	},
	mounted() {
		MemberService.get(1).then((response) => {
			this.profile = new Person(response.data[0]);
			this.profile.updateDate();
			console.log(this.profile);
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
			this.$router.push({ name: "MemberEdit", params: { id: this.id } });
		},
	},
};
</script>

<style>
</style>