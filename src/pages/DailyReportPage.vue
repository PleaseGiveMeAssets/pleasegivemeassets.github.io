<template>
  <div class="daily-trend">
    <div v-if="isLoading">
      <LoadingComponent />
    </div>
    <div v-show="!isLoading">
      <TrendStock @loaded="onComponentLoaded" />
      <RecommendStock @loaded="onComponentLoaded" />
    </div>
  </div>
</template>

<script setup>
import TrendStock from "../components/dailyreport/TrendStock.vue";
import RecommendStock from "../components/dailyreport/RecommendStock.vue";
import { ref } from "vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const isLoading = ref(true);
const loadingCount = ref(2);

const onComponentLoaded = () => {
  loadingCount.value -= 1;
  if (loadingCount.value === 0) {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.daily-trend {
  padding: 20px;
}
</style>
