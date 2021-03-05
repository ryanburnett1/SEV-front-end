<template>
	<div v-if="$store.getters.isLoggedIn">
		<!-- if not mobile then show tab based menu -->
		<v-tabs
			v-if="!$vuetify.breakpoint.mobile"
			background-color="transparent"
			active-class="active-class"
			next-icon
			optional
			slider-color="secondary"
		>
			<v-tab
				v-for="route in $router.options.routes"
				:key="route.path"
				:to="route.path"
				v-show="showTab(route)"
			>
				<v-icon v-if="route.meta.icon" dense left>{{ route.meta.icon }}</v-icon>
				{{ route.name }}
			</v-tab>
		</v-tabs>
		<!-- if mobile show option (burger) menu -->
		<v-menu offset-y transition="scroll-y-transition" v-else>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" icon>
					<v-icon>mdi-menu</v-icon>
				</v-btn>
			</template>
			<v-list nav>
				<v-list-item-group>
					<v-list-item
						v-for="route in $router.options.routes"
						:key="route.path"
						:to="route.path"
						v-show="showTab(route)"
					>
						<v-list-item-icon>
							<v-icon v-if="route.meta.icon">{{ route.meta.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ route.name }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	methods: {
		// hides routes from menus
		showTab: function (route) {
			// list of manual excludes. Handy for crafting personal links, buttons, etc.
			if (route.name in []) return false;

			// hide if meta says so in @/router/index.js
			return !route.meta.hide;
		},
	},
};
</script>

<style scoped lang="scss">
.active-class {
	color: var(--v-accent-lighten1) !important;
	// background-color: whitesmoke !important;
}
</style>
