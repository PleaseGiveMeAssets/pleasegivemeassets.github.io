<!-- HeaderPage.vue -->
<template>
  <header class="header">
    <button v-if="showBackButton" class="back-button" @click="goBack">
      뒤로
    </button>
    <h1>{{ currentTitle }}</h1>
    <div class="header-actions"></div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHeaderStore } from "@/stores/headerStore";

const router = useRouter();
const route = useRoute();

const headerStore = useHeaderStore();

const { title } = headerStore;

const showBackButton = computed(() => {
  return router.currentRoute.value.name !== "home";
});

const currentTitle = computed(() => headerStore.title);

const goBack = () => router.back();
</script>

<style scoped>
.header {
  height: 48px;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
  font-size: 16px;
}
</style>
