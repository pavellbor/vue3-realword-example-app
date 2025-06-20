import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Settings from "../pages/Settings.vue";
import ArticleEditor from "../pages/ArticleEditor.vue";
import Article from "../pages/Article.vue";
import Profile from "../pages/Profile.vue";
import DefaultLayout from "../components/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: Home },
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/profile",
        component: Profile,
      },
      {
        path: "/settings",
        component: Settings,
      },
      {
        path: "/editor",
        component: ArticleEditor,
      },
      {
        path: "/article",
        component: Article,
      },
    ],
  },
];

export const router = createRouter({ history: createWebHistory(), routes });
