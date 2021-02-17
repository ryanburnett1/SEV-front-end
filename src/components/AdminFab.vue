<template>
	<v-speed-dial v-model="fab" bottom right fixed v-if="isLoggedIn">
		<template v-slot:activator>
			<v-btn v-model="fab" fab dark color="blue darken-2" v-if="!isEmpty()">
				<v-icon v-if="fab">mdi-close</v-icon>
				<v-icon v-else>mdi-cog</v-icon>
			</v-btn>
		</template>
		<v-btn @click="editFunction" v-if="!!editFunction">Edit</v-btn>
		<v-btn @click="deleteFunction" v-if="!!deleteFunction">Delete</v-btn>
		<v-btn @click="saveFunction" v-if="!!saveFunction">Save</v-btn>
		<v-btn @click="cancelFunction" v-if="!!cancelFunction">Cancel</v-btn>
	</v-speed-dial>
</template>

<script>
export default {
	props: ["editFunction", "deleteFunction", "saveFunction", "cancelFunction"],
	data() {
		return {
			fab: false,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
	},
	methods: {
		isEmpty() {
			return (
				!!this.editFunction &&
				!!this.deleteFunction &&
				!!this.saveFunction &&
				!!this.cancelFunction
			);
		},
	},
};
</script>

<style>
</style>