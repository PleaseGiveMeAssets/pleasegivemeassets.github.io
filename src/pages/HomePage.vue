<template>
  <div class="home">
    <HomeDailyTrend />

    <HomePortfolio />

    <HomeRecommendStock />
  </div>
</template>

<script setup>
import HomeDailyTrend from "../components/home/HomeDailyTrend.vue";
import HomePortfolio from "../components/home/HomePortfolio.vue";
import HomeRecommendStock from "../components/home/HomeRecommendStock.vue";
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
