<!-- HeaderNavigator.vue -->
<template>
  <header class="header">
    <button v-if="showBackButton" class="back-button" @click="goBack">
      <img src="@/assets/icons/backButton-icon.svg" alt="Back" />
    </button>
    <p class="header-title">{{ currentTitle }}</p>
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
p {
  margin: 0px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 8px 12px 16px;
  gap: 8px;
  isolation: isolate;
  height: 48px;
  background-color: var(--main-background-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
}

.header-title {
  font-family: "Pretendard", sans-serif;
  font-weight: 500; /* Pretendard medium */
  font-size: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
  padding-bottom: 0; /* 아래 패딩 제거 */
}

.header-actions {
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
