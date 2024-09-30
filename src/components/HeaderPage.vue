<!-- HeaderPage.vue -->
<template>
  <header class="header">
    <button v-if="showBackButton" class="back-button" @click="goBack">
      뒤로
    </button>
    <h1>{{ pageTitle }}</h1>
    <div class="header-actions"></div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const pageTitle = computed(() => {
  return route.meta.title || "앱 이름";
});

const showBackButton = computed(() => {
  return router.currentRoute.value.name !== "home";
});

const goBack = () => router.back();
</script>

<style scoped>
.header {
  position: fixed;
  width: 600px;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
  font-size: 16px;
}
</style>
