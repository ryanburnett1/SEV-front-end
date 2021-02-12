<template>
	<v-hover :disabled="data.disabled" v-slot="{ hover }">
		<v-skeleton-loader type="card">
			<v-card
				:elevation="hover ? 16 : 2"
				:class="{ 'on-hover': hover }"
				height="350"
				max-width="350"
			>
				<v-img :src="data.image"></v-img>
				<v-card-subtitle>{{ data.name }} | id: {{ data.id }}</v-card-subtitle>
				<v-divider></v-divider>
				<v-card-text>{{ data.info }}</v-card-text>
			</v-card>
		</v-skeleton-loader>
	</v-hover>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default() {
				return {
					name: "Default Name",
					image: "https://picsum.photos/1920/1080?random",
					info: "Default Info",
					id: "-1",
					disabled: false,
				};
			},
		},
	},
	data() {
		return {
			hover: false,
		};
	},
	methods: {},
};
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
	background-color: rgba(#FFF, 0.8)
	>.v-card__text
		color: #000
</style>