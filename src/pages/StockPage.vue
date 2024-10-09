<template>
  <div class="stock">
    <StockChart :data="stockPriceData" />
    <MyPortfolio :data="portfolioData" />
    <StockIndex :data="indexData" />
    <NewsList :data="newsData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import StockChart from "@/components/stock/StockChart.vue";
import MyPortfolio from "@/components/stock/StockPortfolio.vue";
import StockIndex from "@/components/stock/StockIndex.vue";
import NewsList from "@/components/news/NewsList.vue";
import newsService from "@/services/newsService";
import stockService from "@/services/stockService";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

// store 가져오기
const headerStore = useHeaderStore();

// 타이틀 변경 함수
const fetchShortCode = (stockId) => {
  console.log(stockId);
  headerStore.setShortCode(stockId);
};
const fetchStockName = (stockName) => {
  console.log(stockName);
  headerStore.setStockName(stockName);
};
const portfolioData = ref({});
const indexData = ref({});
const stockPriceData = ref({});
const newsData = ref({});

const fetchIndexData = async () => {
  return await stockService.fetchStockIndex(props.stockId);
};
const fetchStockPriceData = async () => {
  return await stockService.fetchStockPrice(props.stockId);
};
const fetchPortfolioData = async () => {
  return await stockService.fetchPortfolioSummary(props.stockId);
};
const fetchNewsData = async () => {
  return await newsService.fetchNewsList(props.stockId);
};
onMounted(async () => {
  Object.assign(portfolioData.value, await fetchPortfolioData());
  Object.assign(indexData.value, await fetchIndexData());
  Object.assign(stockPriceData.value, await fetchStockPriceData());
  Object.assign(newsData.value, await fetchNewsData());
  fetchShortCode(props.stockId);
  fetchStockName(portfolioData.value.name);
});
</script>

<style scoped>
.stock {
  padding-top: 48px;
  padding-bottom: 48px;
}
.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
