<template>
  <div>StockIndex{{ stockId }}</div>
</template>

<script setup>
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
async function fetchStockIndexData() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/stock/${props.stockId}/index`
  );
  return response.data;
}
</script>

<style scoped>
div {
  height: 48px;
}
</style>
