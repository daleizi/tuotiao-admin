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
      },
      {
        path: "/article",
        name: "article", //内容管理
        component: () => import("@/views/article")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 存储用户信息
const user = JSON.parse(window.localStorage.getItem("user"));
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
