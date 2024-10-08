<template>
  <div>
    <StockChart :data="stockPriceData" />
    <MyPortfolio :data="portfolioData" />
    <StockIndex :data="indexData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import StockChart from "@/components/stock/StockChart.vue";
import MyPortfolio from "@/components/stock/StockPortfolio.vue";
import StockIndex from "@/components/stock/StockIndex.vue";
import apiService from "@/services/stockService";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

// store 가져오기
const headerStore = useHeaderStore();

// 타이틀 변경 함수
const changeTitle = (stockId) => {
  headerStore.setTitle(stockId);
};

const portfolioData = ref({});
const indexData = ref({});
const stockPriceData = ref({});

const fetchIndexData = async () => {
  return await apiService.fetchStockIndex(props.stockId);
};
const fetchStockPriceData = async () => {
  return await apiService.fetchStockPrice(props.stockId);
};
const fetchPortfolioData = async () => {
  return await apiService.fetchPortfolioSummary(props.stockId);
};
onMounted(async () => {
  changeTitle(props.stockId);
  Object.assign(portfolioData.value, await fetchPortfolioData());
  Object.assign(indexData.value, await fetchIndexData());
  Object.assign(stockPriceData.value, await fetchStockPriceData());
  console.log(stockPriceData.value);
});
</script>

<style scoped>
.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
