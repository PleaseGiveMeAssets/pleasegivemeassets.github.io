<template>
  <div>
    <div class="logo-section">
      <img class="logo-img" src="@/assets/images/logo-gray.png" />
    </div>
    <TrendStock />
    <div class="gap-div"></div>
    <RecommendStock />
  </div>
</template>

<script setup>
import TrendStock from "../components/dailyreport/TrendStock.vue";
import RecommendStock from "../components/dailyreport/RecommendStock.vue";
</script>

<style scoped>
.logo-section {
  padding: 20px 0 20px 0;
}

.logo-section > img {
  width: 60px;
}

.gap-div {
  height: 32px;
}
</style>
