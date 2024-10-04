<template>
  <div>StockPortfolioDetail{{ stockId }}</div>
</template>

<script setup>
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

async function fetchStockPortfolioDetailData() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/portfolio/${props.stockId}/order`
  );
  return response.data;
}
</script>

<style scoped>
div {
  height: 48px;
}
</style>
