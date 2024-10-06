<template>
  <div v-if="loadingStore.isLoading" class="loading-spinner"></div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loadingStore"; // Pinia 스토어 가져오기

const loadingStore = useLoadingStore();
</script>

<style scoped>
.loading-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
