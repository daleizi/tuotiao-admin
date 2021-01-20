import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "", // path为空，会作为默认子路由
        name: "home",
        component: () => import("@/views/home")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
