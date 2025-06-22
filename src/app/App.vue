<script setup lang="ts">
import { userApi } from "../api/user";
import { useUserStore } from "../stores/user";
import { TOKEN_KEY } from "../constants/api";


const init = async () => {
  const userStore = useUserStore();
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    const user = await userApi.getCurrentUser();
    userStore.setUser(user);
  }
};

init();
</script>

<template>
  <RouterView />
</template>
