<!-- HeaderPage.vue -->
<template>
  <header class="header">
    <button v-if="showBackButton" class="back-button" @click="goBack">
      뒤로
    </button>
    <div class="title">{{ currentTitle }}</div>
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
  background-color: white;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
  font-size: 16px;
}

.title {
  display: block;
  font-weight: bold;
  font-size: 16px;
  color: black;
}
</style>
