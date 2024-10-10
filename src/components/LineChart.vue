<template>
  <div class="chart-wrapper">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
} from "chart.js";

// ChartJS 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

// 차트 ref
const lineChart = ref(null);

// 차트 초기화 함수
const initializeChart = () => {
  const ctx = lineChart.value.getContext("2d");

  new ChartJS(ctx, {
    type: "line",
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "수익률 (%)",
          },
        },
        x: {
          title: {
            display: true,
          },
        },
      },
    },
  });
};

// 컴포넌트 마운트 후 차트 생성
onMounted(() => {
  initializeChart();
});

// chartData가 변경될 때마다 차트를 업데이트
watch(
  () => props.chartData,
  () => {
    if (lineChart.value) {
      initializeChart();
    }
  },
);
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 300px;
  height: 200px;
  padding-bottom: 20px;
}
</style>
