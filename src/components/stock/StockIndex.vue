<template>
  <div>
    <h3>Stock Index</h3>
    <p>Market Capitalization: {{ indexData.marketCapitalization }}</p>
    <p>PER: {{ indexData.per }}</p>
    <p>PBR: {{ indexData.pbr }}</p>
    <p>ROE: {{ indexData.roe }}</p>
    <p>PSR: {{ indexData.psr }}</p>
    <p>BPS: {{ indexData.bps }}</p>
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
const indexData = ref({});

const fetchIndexData = async () => {
  indexData.value = await apiService.fetchStockIndex(props.stockId);
};

onMounted(() => {
  fetchIndexData();
});
</script>

<style scoped>
div {
  height: 48px;
}
</style>
