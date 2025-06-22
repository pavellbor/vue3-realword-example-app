<script setup lang="ts">
import { TOKEN_KEY } from "../constants/api";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, watch } from "vue";
import { userApi } from "../api/user";
import ErrorMessages from "../components/sections/ErrorMessages.vue";
import type { User } from "../types/user";
import { useApiClient } from "../composables/useApiClient";

const router = useRouter();
const userStore = useUserStore();

const formData = ref({
  email: userStore.user?.email,
  password: "",
  username: userStore.user?.username,
  bio: userStore.user?.bio,
  image: userStore.user?.image || "",
});

const { callback, errors, isLoading } = useApiClient();

watch(() => userStore.user, (user: User | null) => {
  formData.value = {
    email: user?.email,
    password: "",
    username: user?.username,
    bio: user?.bio,
    image: user?.image || "",
  };
});

const updateUser = async () => {
  const payload: Parameters<typeof userApi.updateUser>[0] = {};

    Object.entries(formData.value).forEach(([key, value]) => {
      if (value) {
        payload[key as keyof typeof payload] = value;
      }
    });

    const user = await userApi.updateUser(payload);
    userStore.setUser(user);
}

const handleUpdateUser = async () => {
  callback(updateUser);
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  userStore.setUser(null);
  router.push("/");
};
</script>

<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ErrorMessages v-if="errors" :errors="errors" />

          <form @submit.prevent="handleUpdateUser">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="formData.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formData.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isLoading"
              >
                <span v-if="isLoading">
                  <i class="ion-load-a"></i>
                  Updating settings...
                </span>
                <span v-else> Update Settings </span>
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
