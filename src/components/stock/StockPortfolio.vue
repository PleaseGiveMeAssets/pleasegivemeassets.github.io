<template>
  <div>
    <h3>My Portfolio</h3>
    <p>Stock Name: {{ portfolioData.name }}</p>
    <p>Price: {{ portfolioData.price }}</p>
    <p>Quantity: {{ portfolioData.quantity }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiService from "./stockApiService";
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
const portfolioData = ref({});

const fetchPortfolioData = async () => {
  portfolioData.value = await apiService.fetchPortfolioSummary(props.stockId);
};

onMounted(() => {
  fetchPortfolioData();
});
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
