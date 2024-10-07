<template>
  <div class="home">
    <header class="header">
      <h1>PGMA(로고)????????</h1>
    </header>

    <section class="summary">
      <HomeDailyTrendPage />
    </section>

    <section class="portfolio">
      <HomePortfolioPage />
    </section>

    <section class="recommendations">
      <HomeRecommendStockPage />
    </section>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
