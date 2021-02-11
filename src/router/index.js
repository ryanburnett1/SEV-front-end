import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			hide: false, // used to hide from navigation menus
			requiresAuth: false, // if requires user to be logged in
			icon: "mdi-home", // icon to display in menus
			role: "", // used to check user roles (admin, member, etc)
		},
	},
	{
		path: "/about",
		name: "About",
		meta: {
			hide: false,
			requiresAuth: false,
			icon: "",
			role: "",
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	// checks each route and blocks users that are not logged in for routes that require an account
	let requiresAuth = to.matched.some(function(x) {
		return x.meta.requiresAuth;
	});

	if (requiresAuth /* && check user role here */) {
		next("/login");
	} else {
		next();
	}
});

export default router;
