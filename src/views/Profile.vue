<template>
	<v-container>
		<v-row> Profile </v-row>
		<admin-fab :deleteFunction="confirmDelete" :editFunction="edit"></admin-fab>
		<confirmation-dialog ref="confirm"></confirmation-dialog>
	</v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

export default {
	props: ["id"],
	components: {
		AdminFab,
		ConfirmationDialog,
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