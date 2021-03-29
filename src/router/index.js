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
      requiresAuth: true, // if requires user to be logged in
      icon: "mdi-home", // icon to display in menus
      roles: [], // used to check user roles (admin, member, etc)
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      hide: true,
      requiresAuth: false,
      icon: "mdi-account",
      roles: [],
    },
    component: () => import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
  },
  {
    path: "/profile/:id",
    name: "Profile",
    meta: {
      hide: true,
      requiresAuth: true,
      icon: "mdi-account-box",
      roles: [],
    },
    props: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Profile.vue"),
  },
  {
    path: "/directory",
    name: "Directory",
    meta: {
      hide: false,
      requiresAuth: true, // can change to true later or use ternary now
      icon: "mdi-account-group",
      roles: [],
    },
    component: () =>
      import(/* webpackChunkName: "directory" */ "@/views/Directory.vue"),
  },
  {
    path: "/group-view/:id",
    name: "Groups",
    meta: {
      hide: false,
      requiresAuth: false,
      icon: "",
      roles: [],
    },
    props: true,
    component: () => import(/**/ "@/views/Group.vue"),
  },
  {
    path: "/events",
    name: "Events",
    meta: {
      hide: false,
      requiresAuth: false,
      icon: "",
      roles: [],
    },
    component: () => import(/**/ "@/views/Events.vue"),
  },
  // {
  //   path: "/group-edit:/id/:isAdd",
  //   name: "GroupEdit",
  //   meta: {
  //     hide: false,
  //     requiresAuth: false, //change later so we don't have to have admin access to test
  //     icon: "", //change icon, I'm not sure what they all are
  //     roles: [],
  //   },
  //   props(route) {
  //     const props = { ...route.params };
  //     props.id = +props.id;
  //     if (typeof props.isAdd === typeof "") {
  //       props.isAdd = props.isAdd == "true";
  //     }
  //     return props;
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "home" */ "@/views/GroupEdit.vue"),
  // },
  // {
  //   path: "grouptype-view/:id",
  //   name: "GroupTypeView",
  //   meta: {
  //     hide: false,
  //     requiresAuth: false,
  //     icon: "",
  //     roles: [],
  //   },
  //   props: true,
  //   component: () => import(/**/ "@/views/GroupType.vue"),
  // },
  // {
  //   path: "/grouptype-edit:/id/:isAdd",
  //   name: "GroupTypeEdit",
  //   meta: {
  //     hide: false,
  //     requiresAuth: false, //can change later, so we don't have to have admin access to test
  //     icon: "",
  //     roles: [],
  //   },
  //   props(route) {
  //     const props = { ...route.params };
  //     props.id = +props.id;
  //     if (typeof props.isAdd === typeof "") {
  //       props.isAdd = props.isAdd == "true";
  //     }
  //     return props;
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "home" */ "@/views/GroupType.vue"),
  // },
  {
    path: "/member-view/:id",
    name: "MemberView",
    meta: {
      hide: true,
      requiresAuth: true, // can change to true later or use ternary now
      icon: "",
      roles: [],
    },
    props: true,
    component: () =>
      import(/* webpackChunkName: "directory" */ "@/views/Member.vue"),
  },
  {
    path: "/member-edit/:id/:isAdd",
    name: "MemberEdit",
    meta: {
      hide: true,
      requiresAuth: true,
      icon: "",
      roles: [],
    },
    props(route) {
      const props = { ...route.params };
      props.id = +props.id;
      if (typeof props.isAdd === typeof "") {
        props.isAdd = props.isAdd == "true";
      }

      return props;
    },
    component: () =>
      import(/* webpackChunkName: "directory" */ "@/views/edit/MemberEdit.vue"),
  },
  {
    path: "/skill-edit/:id/:isAdd",
    name: "SkillEdit",
    meta: {
      hide: true,
      requiresAuth: true,
      icon: "",
      roles: ["Admin"],
    },
    props(route) {
      const props = { ...route.params };
      props.id = +props.id;
      if (typeof props.isAdd === typeof "") {
        props.isAdd = props.isAdd == "true";
      }

      return props;
    },
    component: () => import(/**/ "@/views/edit/SkillEdit.vue"),
  },
  {
    path: "/password-reset/:id/:token",
    name: "PasswordReset",
    alias: "/reset/:id/:token",
    meta: {
      hide: true,
      requiresAuth: false,
      icon: "",
      roles: [],
    },
    props(route) {
      const props = { ...route.params };
      props.id = +props.id;

      return props;
    },
    component: () => import(/**/ "@/views/PasswordReset.vue"),
  },
  {
    path: "/test",
    name: "Test",
    meta: {
      hide: process.env.NODE_ENV === "production" ? true : false,
      requiresAuth: false,
      icon: "mdi-cog",
      roles: [],
    },
    component: () => import(/* webpackChunkName: "test" */ "@/views/Test.vue"),
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "home" */ "@/views/404.vue"),
    name: "404",
    meta: {
      hide: true,
      requiresAuth: false,
      icon: "",
      roles: [],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // checks each route and blocks users that are not logged in for routes that require an account
  let requiresAuth = to.matched.some(function(x) {
    return x.meta.requiresAuth;
  });
  let roles = to.meta.roles;

  if (requiresAuth || roles.length > 0) {
    if (store.getters.isLoggedIn) {
      if (roles.length !== 0 && !roles.includes(store.getters.getUserRole)) {
        console.log("User Role Not Met: Return To 404");
        next("/*");
        return;
      }
      next();
      return;
    }

    next("/login");
  } else {
    next();
  }
});

export default router;
