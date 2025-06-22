<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.user !== null);
</script>

<template>
  <header>
    <nav v-if="isAuthenticated" class="navbar navbar-light">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :to="`/profile/${userStore.user?.username}`"
            >
              <img :src="userStore.user?.image || ''" class="user-pic" />
              {{ userStore.user?.username }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <nav v-else class="navbar navbar-light">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Sign in</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/register">Sign up</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
