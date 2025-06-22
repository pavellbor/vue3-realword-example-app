import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);

    const setUser = (userData: User | null) => {
        user.value = userData;
    }

    return {
        user,
        setUser,
    }
})