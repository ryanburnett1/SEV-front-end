<template>
	<v-card class="mx-auto">
		<v-toolbar flat color="primary" dense>
			<v-toolbar-title class="text-body-2 font-weight-bold white--text">
				Check All
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-checkbox
					dark
					class="pt-5 align-center justify-center"
					v-model="selectAll"
				></v-checkbox>
			</v-toolbar-items>
		</v-toolbar>
		<v-list
			subheader
			two-line
			:max-height="isScroll ? maxHeight : ''"
			:class="isScroll ? 'overflow-y-auto' : ''"
		>
			<v-list-item-group
				multiple
				v-model="selected"
				@change="emitSelectionChanged"
			>
				<template v-for="(person, index) in people">
					<v-divider :key="`divider-${index}`"></v-divider>
					<v-list-item
						:key="`item-${index}`"
						:value="person"
						active-class="light-blue--text text--accent-4"
					>
						<template v-slot:default="{ active }">
							<v-list-item-avatar rounded size="60">
								<v-img :src="person.picture"></v-img>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title
									v-html="person.fullName()"
								></v-list-item-title>
								<v-list-item-subtitle v-html="'other'"></v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action>
								<v-checkbox
									:input-value="active"
									color="light-blue accent-4"
								></v-checkbox>
							</v-list-item-action>
						</template>
					</v-list-item>
				</template>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
export default {
	props: {
		people: Array,
		maxHeight: {
			type: Number,
			default: 600,
		},
	},
	data() {
		return {
			selected: [],
		};
	},
	computed: {
		isScroll() {
			return this.people.length * 100 > this.maxHeight;
		},
		selectAll: {
			get: function () {
				return this.people ? this.selected.length == this.people.length : false;
			},
			set: function (value) {
				let selected = [];
				if (value) {
					this.people.forEach((person) => {
						selected.push(person);
					});
				}

				this.selected = selected;
				this.emitSelectionChanged(this.selected);
			},
		},
	},
	methods: {
		emitSelectionChanged(event) {
			this.$emit("onSelectionChanged", event);
		},
	},
	mounted() {},
};
</script>

<style>
</style>