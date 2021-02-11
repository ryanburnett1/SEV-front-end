<template>
	<v-container fluid>
		<!-- if not mobile then show tab based menu -->
		<div v-if="!$vuetify.breakpoint.mobile">
			<v-tabs background-color="primary">
				<v-tab
					v-for="route in $router.options.routes"
					:key="route.path"
					:to="route.path"
					v-show="showTab(route)"
				>
					<v-icon v-if="route.meta.icon">{{ route.meta.icon }}</v-icon>
					{{ route.name }}
				</v-tab>
			</v-tabs>
		</div>
		<!-- if mobile show option (burger) menu -->
		<div v-else>
			<v-menu offset-y transition="scroll-y-transition">
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
	</v-container>
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

<style>
</style>