<template>
	<v-container
		>Edit Member here

		<admin-fab :cancelFunction="cancel" :saveFunction="save"></admin-fab>
	</v-container>
</template>

<script>
import AdminFab from "../../components/AdminFab.vue";
export default {
	props: ["id"],
	components: {
		AdminFab,
	},
	methods: {
		cancel() {
			this.$router.back();
		},
		save() {
			console.log("saved");
			this.$router.back();
		},
	},
};
</script>

<style>
</style>