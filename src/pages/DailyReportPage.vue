<template>
  <div class="daily-trend">
    <TrendStock />
    <RecommendStock />
  </div>
</template>

<script setup>
import TrendStock from "../components/dailyreport/TrendStock.vue";
import RecommendStock from "../components/dailyreport/RecommendStock.vue";
</script>

<style scoped>
.daily-trend {
  padding: 20px;
}
</style>
