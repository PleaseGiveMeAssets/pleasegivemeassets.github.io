<template>
  <div class="daily-trend">
    <TrendPage />
    <RecommendStockPage />
  </div>
</template>

<script setup>
import TrendPage from "./TrendPage.vue";
import RecommendStockPage from "./RecommendStockPage.vue";
</script>

<style scoped>
.daily-trend {
  padding: 20px;
}
</style>
