<template>
  <loading v-if="isLoading || chartOptions.series[0].data.length == 0" />

  <div v-if="!isLoading && chartOptions.series[0].data.length != 0">
    <highcharts ref="highchartsRef" :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLoadingStore } from "@/stores/loadingStore";
import Loading from "@/components/LoadingComponent.vue";

const loadingStore = useLoadingStore();
const isLoading = loadingStore.isLoading;

const props = defineProps({
  fetchStockPrice: {
    type: Function,
    required: true,
  },
  stockId: {
    type: String,
    required: true,
  },
});

const chartOptions = ref({
  title: {
    text: "Stock Price History",
  },
  xAxis: {
    type: "datetime",
    title: {
      text: "Time",
    },
  },
  yAxis: {
    title: {
      text: "Price",
    },
  },
  series: [
    {
      name: "Price",
      data: [], // 데이터를 fetchStockChartData로 업데이트
    },
  ],
});

// 데이터를 가져와서 차트 업데이트
const fetchStockChartData = async () => {
  const data = await props.fetchStockPrice();

  console.log(data);
  const parsedData = data.map((item) => {
    const date = new Date(
      item.stockHistoryId.slice(0, 4),
      item.stockHistoryId.slice(4, 6) - 1,
      item.stockHistoryId.slice(6, 8),
      item.stockHistoryId.slice(8, 10),
      item.stockHistoryId.slice(10, 12),
    ).getTime();
    return [date, parseFloat(item.closedPrice)];
  });
  chartOptions.value.series[0].data = parsedData;
};
onMounted(() => {
  fetchStockChartData();
});
</script>

<style scoped>
div {
  height: 400px;
  width: 100%;
}
</style>
