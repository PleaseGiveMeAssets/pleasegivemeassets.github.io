<template>
  <div v-if="chartOptions.series[0].data !== null">
    <highcharts ref="highchartsRef" :options="chartOptions"></highcharts>
  </div>
  <div v-else class="chartSkeleton card-ui">데이터가 없습니다.</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  data: {
    type: Object,
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
chartOptions.value.series[0].data = computed(() => {
  if (Object.keys(props.data).length === 0) return null;
  const parsedData = props.data.map((item) => {
    const date = new Date(
      item.stockHistoryId.slice(0, 4),
      item.stockHistoryId.slice(4, 6) - 1,
      item.stockHistoryId.slice(6, 8),
      item.stockHistoryId.slice(8, 10),
      item.stockHistoryId.slice(10, 12),
    ).getTime();
    return [date, parseFloat(item.price)];
  });
  return parsedData;
});
</script>

<style scoped>
div {
  height: 400px;
  width: 100%;
}
.chartSkeleton {
  display: flex;
  justify-content: center; /* 좌우 가운데 정렬 */
  align-items: center; /* 상하 가운데 정렬 */
  background-color: white;
}
</style>
