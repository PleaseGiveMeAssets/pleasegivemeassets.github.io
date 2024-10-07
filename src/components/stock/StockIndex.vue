<template>
  <!-- 로딩 상태가 true일 때 로딩 컴포넌트 표시 -->
  <loading v-if="isLoading || !indexData" />

  <!-- 데이터가 로드되면 표시할 콘텐츠 -->
  <div v-if="!isLoading && indexData">
    <div class="card-ui">
      <h3>Stock Index</h3>
      <p>Market Capitalization: {{ indexData.marketCapitalization }}</p>
      <p>PER: {{ indexData.per }}</p>
      <p>PBR: {{ indexData.pbr }}</p>
      <p>ROE: {{ indexData.roe }}</p>
      <p>PSR: {{ indexData.psr }}</p>
      <p>BPS: {{ indexData.bps }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiService from "../../services/stockApiService";
import { useLoadingStore } from "@/stores/loadingStore"; // Pinia 스토어 가져오기
import Loading from "@/components/LoadingComponent.vue"; // 로딩 컴포넌트 가져오기

const loadingStore = useLoadingStore();
const isLoading = loadingStore.isLoading;

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
const indexData = ref(null);

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

body {
  height: 10000px;
}
.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
