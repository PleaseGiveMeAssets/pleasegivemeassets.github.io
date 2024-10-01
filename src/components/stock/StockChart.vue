<template>
  <div>StockChart{{ stockId }}</div>
</template>

<script setup>
import { computed } from "vue";
import axios from "axios";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

async function fetchStockChartData() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/stock/${props.stockId}`
  );
  return response.data;
}
</script>

<style scoped>
div {
  height: 48px;
}
</style>
