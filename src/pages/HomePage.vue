<template>
  <div class="home">
    <header class="header">
      <h1>PGMA(로고)</h1>
      <p class="report-time">다음 리포트까지 23시간 남았어요!</p>
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
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.summary,
.portfolio,
.recommendations {
  margin-top: 20px;
}

.report-time {
  color: #888;
  font-size: 14px;
}

.portfolio,
.recommendations {
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
</style>
