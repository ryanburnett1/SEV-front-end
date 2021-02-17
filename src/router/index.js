import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index.js";

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
		path: "/login",
		name: "Login",
		meta: {
			hide: false,
			requiresAuth: false,
			icon: "mdi-account",
			role: "",
		},
		component: () => import(/* webpackChunkName: "home" */ "@/views/Login.vue")
	},
	{
		path: "/profile/:id",
		name: "Profile",
		meta: {
			hide: true,
			requiresAuth: true,
			icon: "mdi-account-box",
			role: "",
		},
		props: true,
		component: () => import(/* webpackChunkName: "home" */ "@/views/Profile.vue"),
	},
	{
		path: "/directory",
		name: "Directory",
		meta: {
			hide: false,
			requiresAuth: true, // can change to true later or use ternary now
			icon: "mdi-account-group",
			role: "",
		},
		component: () => import(/* webpackChunkName: "home" */ "@/views/Directory.vue"),
	},
	{
		path: "/member-view/:id",
		name: "MemberView",
		meta: {
			hide: true,
			requiresAuth: false, // can change to true later or use ternary now
			icon: "",
			role: "",
		},
		props: true,
		component: () => import(/**/ "@/views/Member.vue"),
	},
	{
		path: "member-edit/:id",
		name: "MemberEdit",
		meta: {
			hide: true,
			requiresAuth: true,
			icon: "",
			role: "",
		},
		props: true,
		component: () => import(/**/ "@/views/edit/MemberEdit.vue"),
	},
	{
		path: "/test",
		name: "Test",
		meta: {
			hide: false,
			requiresAuth: false,
			icon: "mdi-cog",
			role: "",
		},
		component: () => import (/* webpackChunkName: "test" */ "@/views/Test.vue"),
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "home" */ "@/views/404.vue"),
		name: "404",
		meta: {
			hide: true,
			requiresAuth: false,
			icon: "",
			role: "",
		}
	}
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

	if (requiresAuth) {
		if (store.getters.isLoggedIn /* add second check for roles here */) {
			next()
			return
		}

		next("/login");
	} else {
		next();
	}
});

export default router;
