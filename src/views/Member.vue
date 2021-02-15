<template>
	<v-container>
		{{ id }}
	</v-container>
</template>

<script>
export default {
	props: ["id"],
	mounted() {
		console.log(this.id);
	},
};
</script>

<style>
</style>