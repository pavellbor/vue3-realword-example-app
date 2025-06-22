<script setup lang="ts">
import Header from "../sections/Header.vue";
import Footer from "../sections/Footer.vue";
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
