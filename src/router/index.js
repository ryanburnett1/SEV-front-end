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
      hide: false,
      requiresAuth: false,
      icon: "mdi-home",
    },
  },
  {
    path: "/about",
    name: "About",
    meta: {
      hide: false,
      requiresAuth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(function(x) {
    return x.meta.requiresAuth;
  });
  if (requiresAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
