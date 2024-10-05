<template>
  <div>
    <StockChart :stock-id="stockId" />
    <MyPortfolio :stock-id="stockId" />
    <StockIndex :stock-id="stockId" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import StockChart from "@/components/stock/StockChart.vue";
import MyPortfolio from "@/components/stock/StockPortfolio.vue";
import StockIndex from "@/components/stock/StockIndex.vue";
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
onMounted(() => {
  changeTitle(props.stockId);
});
</script>
