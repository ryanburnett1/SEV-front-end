<template>
	<v-container>
		{{ id }}
		<v-btn @click="$router.push({ name: 'MemberEdit', params: { id: id } })"
			>Edit</v-btn
		>
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