<template>
  <div class="home">
    <HomeDailyTrendPage />

    <HomePortfolioPage />

    <HomeRecommendStockPage />
  </div>
</template>

<script setup>
import HomeDailyTrendPage from "./HomeDailyTrendPage.vue";
import HomePortfolioPage from "./HomePortfolioPage.vue";
import HomeRecommendStockPage from "./HomeRecommendStockPage.vue";
</script>

<style scoped>
.home {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
