<template>
  <div class="chart-wrapper">
    <highcharts
      ref="highchartsRef"
      class=""
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--primary-color")
  .trim();
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const chartOptions = ref({
  chart: {
    height: 300,
    animation: false,
  },
  title: {
    text: "",
  },
  subtitle: {
    align: "center",
    style: {
      fontFamily: "Pretendard-Bold",
      fontSize: "12px",
      color: "#000000",
    },
    useHTML: true,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: "category",
    labels: {
      enabled: true,
      rotation: -10, // 라벨을 수평으로 설정
      style: {
        fontSize: "10px",
      },
    },

    lineWidth: 0,
    tickLength: 0,
    gridLineWidth: 0,
  },
  yAxis: {
    labels: {
      enabled: false,
    },
    tickLength: 0,
    gridLineWidth: 0,
    title: {
      text: null,
    },
  },
  plotOptions: {
    series: {
      animation: false,
    },
  },
  rangeSelector: {
    selected: 1,
  },
  series: [
    {
      name: "가격",
      data: [],
      color: primaryColor,
    },
  ],
  legend: {
    enabled: false,
  },
});

onMounted(() => {
  const parsedData = props.chartData.datasets[0].data.map((value, index) => {
    const dateStr = props.chartData.labels[index]; // labels에서 날짜를 가져옴
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // JavaScript의 month는 0부터 시작
    const day = parseInt(dateStr.slice(6, 8), 10);

    return [Date.UTC(year, month, day), value];
  });

  chartOptions.value.series[0].data = parsedData;
});

// Chart.js 구성 요소 등록
</script>

<style scoped>
.chart-wrapper {
  height: 300px;
  padding-bottom: 20px;
  background-color: #6e2ff4;
}
.highcharts {
  height: 300px;
}
</style>
