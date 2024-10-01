<template>
  <div>StockPortfolio{{ stockId }}</div>
</template>

<script setup>
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

async function fetchStockPortfolioData() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/portfolio/${props.stockId}`
  );
  return response.data;
}
</script>

<style scoped>
div {
  height: 48px;
}
</style>
