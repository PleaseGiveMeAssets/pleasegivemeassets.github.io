<template>
  <div>
    <div v-if="isLoading">
      <LoadingComponent />
    </div>

    <div v-show="!isLoading">
      <HomePortfolio @loaded="onComponentLoaded" />
      <HomeDailyTrend @loaded="onComponentLoaded" />
      <HomeRecommendStock @loaded="onComponentLoaded" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeDailyTrend from "../components/home/HomeDailyTrend.vue";
import HomePortfolio from "../components/home/HomePortfolio.vue";
import HomeRecommendStock from "../components/home/HomeRecommendStock.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const isLoading = ref(true);
const loadingCount = ref(3);

const onComponentLoaded = () => {
  loadingCount.value -= 1;
  if (loadingCount.value === 0) {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
