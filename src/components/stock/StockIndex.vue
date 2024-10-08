<template>
  <div :key="forceRerender" class="card-ui">
    <div>Market Capitalization: {{ data.marketCapitalization }}</div>
    <div>PER: {{ data.per }}</div>
    <div>PBR: {{ data.pbr }}</div>
    <div>ROE: {{ data.roe }}</div>
    <div>PSR: {{ data.psr }}</div>
    <div>BPS: {{ data.bps }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiService from "../../services/stockService";
import { useLoadingStore } from "@/stores/loadingStore"; // Pinia 스토어 가져오기
import Loading from "@/components/LoadingComponent.vue"; // 로딩 컴포넌트 가져오기

const loadingStore = useLoadingStore();
const isLoading = loadingStore.isLoading;

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
