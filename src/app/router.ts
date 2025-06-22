import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../components/layouts/DefaultLayout.vue";
import { TOKEN_KEY } from "../constants/api";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("../pages/Home.vue"),
        meta: {
          role: "any",
        },
      },
      {
        path: "/login",
        component: () => import("../pages/Login.vue"),
        meta: {
          role: "guest",
        },
      },
      {
        path: "/register",
        component: () => import("../pages/Register.vue"),
        meta: {
          role: "guest",
        },
      },
      {
        path: "/profile",
        component: () => import("../pages/Profile.vue"),
        meta: {
          role: "user",
        },
      },
      {
        path: "/settings",
        component: () => import("../pages/Settings.vue"),
        meta: {
          role: "user",
        },
      },
      {
        path: "/editor",
        component: () => import("../pages/ArticleEditor.vue"),
        meta: {
          role: "user",
        },
      },
      {
        path: "/article",
        component: () => import("../pages/Article.vue"),
        meta: {
          role: "any",
        },
      },
    ],
  },
];

export const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const role = to.meta.role;

  if (role === "user" && !token) {
    return { path: "/login" };
  } else if (role === "guest" && token) {
    return { path: "/" };
  } else {
    return true;
  }
});
