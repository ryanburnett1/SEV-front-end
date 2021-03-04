<template>
	<v-hover
		:disabled="data.disabled"
		v-slot="{ hover }"
		:class="data.disabled ? 'disabled-style' : ''"
	>
		<v-skeleton-loader type="card">
			<v-card
				:elevation="hover ? 16 : 2"
				:class="{ 'on-hover': hover, 'max-auto': true }"
				min-width="20vw"
				max-width="35vw"
				min-height="20vh"
				max-height="35vh"
				:disabled="data.disabled"
				v-if="!!person"
			>
				<v-skeleton-loader type="image">
					<v-img
						:src="person.picture"
						class="red--text align-end"
						aspect-ratio="1920/1080"
						contain
						:lazy-src="require('@/assets/images/scared-batman.jpg')"
					>
						<v-card-title v-if="data.disabled"
							>Status / Disabled / Left
						</v-card-title>
					</v-img>
				</v-skeleton-loader>
				<v-card-subtitle
					>{{ person.fullName() }} | id: {{ person.id }}
				</v-card-subtitle>
				<v-divider></v-divider>
				<v-card-text>{{ person.skill }}</v-card-text>
			</v-card>
			<v-card
				:elevation="hover ? 16 : 2"
				:class="{ 'on-hover': hover, 'max-auto': true }"
				height="350"
				max-width="350"
				:disabled="data.disabled"
				v-else
			>
				<v-skeleton-loader type="image">
					<v-img
						:src="data.image"
						class="red--text align-end"
						:lazy-src="require('@/assets/images/scared-batman.jpg')"
					>
						<v-card-title v-if="data.disabled"
							>Status / Disabled / Left
						</v-card-title>
					</v-img>
				</v-skeleton-loader>
				<v-card-subtitle>{{ data.name }} | id: {{ data.id }} </v-card-subtitle>
				<v-divider></v-divider>
				<v-card-text>{{ data.info }}</v-card-text>
			</v-card>
		</v-skeleton-loader>
	</v-hover>
</template>

<script>
import Person from "@/models/person.model";

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
		person: {
			type: Person,
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
	cursor: pointer;
}

.disabled-style {
	transform: scale(0.97) !important;
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
