<template>
	<div class="home">
		<confirmation-dialog ref="confirm" />
		<v-btn @click="testDialog()">Delete?</v-btn>
	</div>
</template>

<script>
// @ is an alias to /src
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

export default {
	name: "Home",
	components: {
		ConfirmationDialog,
	},
	methods: {
		async testDialog() {
			// get info about operation here and craft message
			if (
				await this.$refs.confirm.open("Confirm Delete", "Are you sure?", {
					persistent: true,
					// noconfirm: true,
				})
			) {
				this.test(); // call function to do operation
			}
		},
		test() {
			console.log("Confirmation Confirmed From Dialog");
		},
	},
};
</script>

ConfirmationDialog