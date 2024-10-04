<template>
  <div>
    <highcharts ref="highchartsRef" :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiService from "./stockApiService";
import axios from "axios";

const props = defineProps({
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
  const data = await apiService.fetchStockPrice(props.stockId);
  const parsedData = data.map((item) => {
    const date = new Date(
      item.stockHistoryId.slice(0, 4),
      item.stockHistoryId.slice(4, 6) - 1,
      item.stockHistoryId.slice(6, 8),
      item.stockHistoryId.slice(8, 10),
      item.stockHistoryId.slice(10, 12),
    ).getTime();
    return [date, parseFloat(item.price)];
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
