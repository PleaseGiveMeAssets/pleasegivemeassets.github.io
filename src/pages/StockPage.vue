<template>
  <Loading v-if="isLoading" />
  <div v-if="!isLoading" class="stock">
    <StockChart :data="stockPriceData" />
    <router-link :to="`/stock/${stockId}/portfolio`" class="noUnderline">
      <MyPortfolio :data="portfolioData" />
    </router-link>
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
import Loading from "@/components/LoadingComponent.vue";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

// store 가져오기
const headerStore = useHeaderStore();

// 헤더 변경 함수
const fetchShortCode = (stockId) => {
  headerStore.setStockSubtitle(stockId);
};
const fetchStockName = (stockName) => {
  headerStore.setStockTitle(stockName);
};
const portfolioData = ref({});
const indexData = ref({});
const stockPriceData = ref({});
const newsData = ref({});
const isLoading = ref(true);

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
  isLoading.value = false;
});
</script>

<style scoped>
.stock {
  padding-top: 54px;
  padding-bottom: 48px;
}
.noUnderline {
  text-decoration: none;
  color: black;
}
.card-ui {
  background-color: var(--main-card-color);
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
  gap: 10px;
  width: 340px;
  transition: transform 0.2s;
  margin-bottom: 20px;
}
</style>
