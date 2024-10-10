<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

// Props to accept chart data
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

// Define chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "수익률 (%)",
      },
    },
    x: {
      title: {
        display: true,
        text: "날짜",
      },
    },
  },
};
</script>

<style scoped>
/* 꺾은선 그래프 스타일을 필요에 맞게 추가 가능 */
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 400px; /* 원하는 높이로 조정 가능 */
}
</style>
