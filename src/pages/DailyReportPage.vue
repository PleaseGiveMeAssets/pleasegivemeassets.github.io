<template>
  <div class="daily-trend">
    <header class="header">
      <div class="header-content">
        <button class="back-button">◀</button>
        <h1>일일 동향</h1>
        <button class="share-button">🔗</button>
      </div>
    </header>

    <section class="pgma-logo">
      <h2>PGMA(로고)</h2>
      <img
        src="https://via.placeholder.com/300x100?text=표지+그림+들어갈+곳+위딩+:+일일+종목+동향"
        alt="표지 그림"
      />
    </section>

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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pgma-logo img {
  margin: 20px 0;
  width: 100%;
}

button {
  flex: 1;
  border: none;
  background: none;
  padding: 10px;
  text-align: center;
}
</style>
