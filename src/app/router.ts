import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../components/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: () => import("../pages/Home.vue") },
      {
        path: "/login",
        component: () => import("../pages/Login.vue"),
      },
      {
        path: "/register",
        component: () => import("../pages/Register.vue"),
      },
      {
        path: "/profile",
        component: () => import("../pages/Profile.vue"),
      },
      {
        path: "/settings",
        component: () => import("../pages/Settings.vue"),
      },
      {
        path: "/editor",
        component: () => import("../pages/ArticleEditor.vue"),
      },
      {
        path: "/article",
        component: () => import("../pages/Article.vue"),
      },
    ],
  },
];

export const router = createRouter({ history: createWebHistory(), routes });
