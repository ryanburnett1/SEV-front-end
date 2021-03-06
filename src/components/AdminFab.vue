<template>
	<v-speed-dial
		v-model="fab"
		bottom
		right
		fixed
		v-if="
			isLoggedIn && ($store.getters.isAdmin || id == $store.getters.getPersonId)
		"
	>
		<template v-slot:activator>
			<v-btn v-model="fab" fab dark color="blue darken-2" v-if="!isEmpty()">
				<v-icon v-if="fab">mdi-close</v-icon>
				<v-icon v-else>mdi-cog</v-icon>
			</v-btn>
		</template>
		<v-btn @click="editFunction" v-if="!!editFunction" fab color="primary">
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
		<v-btn
			@click="deleteFunction"
			v-if="!!deleteFunction && $store.getters.isAdmin"
			fab
			color="error"
		>
			<v-icon>mdi-delete</v-icon>
		</v-btn>
		<v-btn @click="saveFunction" v-if="!!saveFunction" fab color="success">
			<v-icon>mdi-floppy</v-icon>
		</v-btn>
		<v-btn
			@click="cancelFunction"
			v-if="!!cancelFunction"
			fab
			color="secondary"
		>
			<v-icon>mdi-cancel</v-icon>
		</v-btn>
	</v-speed-dial>
</template>

<script>
export default {
	props: [
		"id",
		"editFunction",
		"deleteFunction",
		"saveFunction",
		"cancelFunction",
	],
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

<style></style>
