<template>
	<v-hover
		:disabled="data.disabled"
		v-slot="{ hover }"
		:class="data.disabled ? 'disabled-style' : ''"
	>
		<v-skeleton-loader type="card">
			<v-card
				:elevation="hover ? 16 : 2"
				:class="{ 'on-hover': hover }"
				height="350"
				max-width="350"
				:disabled="data.disabled"
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

<style lang="scss" scoped>
.on-hover {
	transform: scale(0.97) !important;
	filter: contrast(115%) brightness(115%);
}

.disabled-style {
	transform: scale(0.97) !important;
}

// color examples
.v-card {
	.v-divider {
		background-color: blue !important;
	}

	.v-card__subtitle {
		color: blue !important;
	}

	.v-card__text {
		color: green !important;
	}
}
// .v-card {
// 	padding: 150px;
// }
</style>