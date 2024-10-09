<template>
  <div class="daily-trend">
    <Trend />
    <RecommendStock />
  </div>
</template>

<script setup>
import Trend from "../components/dailyreport/Trend.vue";
import RecommendStock from "../components/dailyreport/RecommendStock.vue";
</script>

<style scoped>
.daily-trend {
  padding: 20px;
}
</style>
