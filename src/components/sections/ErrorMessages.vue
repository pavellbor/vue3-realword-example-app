<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  errors: Record<string, string[]>;
}>();

const errorMessages = computed(() => {
  return Object.entries(props.errors).map(([field, messages]) => {
    return `${field} - ${messages.join(", ").toLowerCase()}`;
  });
});
</script>

<template>
  <ul class="error-messages">
    <li v-for="error in errorMessages" :key="error">{{ error }}</li>
  </ul>
</template>
