import { ref } from "vue";
import { ApiError } from "../libs/apiClient";

export const useApiClient = () => {
  const isLoading = ref(false);
  const errors = ref<ApiError["errors"] | null>(null);

  const callback = async (fn: () => Promise<any>) => {
    try {
      isLoading.value = true;
      return await fn();
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        errors.value = error.errors;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errors,
    callback,
  };
};
