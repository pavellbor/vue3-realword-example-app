<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { userApi } from "../api/user";
import ErrorMessages from "../components/sections/ErrorMessages.vue";
import { useApiClient } from "../composables/useApiClient";

const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  username: "",
  email: "",
  password: "",
});

const { callback, errors, isLoading } = useApiClient();

const register = async () => {
  const user = await userApi.register(formData.value);
  userStore.setUser(user);
  localStorage.setItem("token", user.token);
  router.push("/");
}

const handleSubmit = async () => {
  callback(register);
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink to="/login">Have an account?</RouterLink>
          </p>

          <ErrorMessages v-if="errors" :errors="errors" />

          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group">
              <input
                v-model="formData.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              />
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
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Signing up...</span>
              <span v-else>Sign up</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
