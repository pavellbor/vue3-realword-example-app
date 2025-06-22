<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { userApi } from "../api/user";
import { ApiError } from "../libs/apiClient";
import ErrorMessages from "../components/sections/ErrorMessages.vue";

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);

const formData = ref({
  email: "",
  password: "",
});

const errors = ref<Record<string, string[]> | null>(null);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const user = await userApi.login(formData.value);
    userStore.setUser(user);
    localStorage.setItem("token", user.token);
    router.push("/");
  } catch (error) {
    if (error instanceof ApiError) {
      errors.value = error.errors;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <RouterLink to="/register">Need an account?</RouterLink>
          </p>

          <ErrorMessages v-if="errors" :errors="errors" />

          <form @submit.prevent="handleSubmit">
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
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
