<template>
	<v-hover
		:disabled="disabled"
		v-slot="{ hover }"
		:class="disabled ? 'disabled-style' : ''"
	>
		<v-skeleton-loader type="card">
			<v-card
				v-if="!!family"
				:disabled="disabled"
				:class="{ 'on-hover': hover, 'max-auto': true }"
				:elevation="hover ? 16 : 2"
			>
				<v-skeleton-loader type="image" class="px-4 pt-4">
					<v-avatar size="150" color="primary">
						<v-img
							:src="family.picture"
							:lazy-src="require('@/assets/images/placeholder_gray.png')"
						>
						</v-img>
					</v-avatar>
				</v-skeleton-loader>
				<v-card-title class="px-4 pt-2 pb-0">
					{{ family.name }}
				</v-card-title>
				<v-card-text v-if="$store.getters.isAdmin" class="px-4 pb-4">
					id: {{ family.id }}
				</v-card-text>
			</v-card>
		</v-skeleton-loader>
	</v-hover>
</template>

<script>
import Family from "@/models/family.model";

export default {
	props: {
		family: {
			type: Family,
			default: new Family({
				id: -1,
				address: "123 NoWhere St.",
				email: "mctestsfam@email.com",
				members: [1, 2, 3],
				name: "Mc Tests",
				phone: "1234567890",
				picture: "https://picsum.photos/1920/1080?random",
				status: "Active",
			}),
		},
	},
	data() {
		return {
			hover: false,
		};
	},
	computed: {
		disabled() {
			return this.family.status == "Disabled";
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.on-hover {
	transform: scale(0.97) !important;
	filter: contrast(115%) brightness(115%);
	cursor: pointer;
}

.disabled-style {
	transform: scale(0.97) !important;
	cursor: pointer;
}

// color examples
.v-card {
	background: var(--v-background-lighten1);

	// .v-divider {
	// 	background-color: blue !important;
	// }

	// .v-card__subtitle {
	// 	color: blue !important;
	// }

	// .v-card__text {
	// 	color: green !important;
	// }
}
// .v-card {
// 	padding: 150px;
// }
</style>
