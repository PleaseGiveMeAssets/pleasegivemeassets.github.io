<template>
  <div class="card-ui">
    <div v-if="chartOptions.series[0].data !== null">
      <highcharts
        ref="highchartsRef"
        class=""
        :options="chartOptions"
        @render="onChartRender"
      ></highcharts>
    </div>
    <div v-else>
      <div class="chartSkeleton">차트 데이터가 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const high = 11120; // 고가
const low = 10880; // 저가
const open = 11100; // 시가
const close = 10940; // 종가
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--primary-color")
  .trim();
const chartOptions = ref({
  chart: {
    height: 300,
    animation: false,
  },
  title: {
    text: "",
  },
  subtitle: {
    text: `
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">시</span> ${open.toLocaleString()}
    </span>
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">종</span> ${close.toLocaleString()}
    </span>
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">저</span> ${low.toLocaleString()}
    </span>
    <span style="display: inline-block;">
      <span style="color:#666666">고</span> ${high.toLocaleString()}
    </span>
    <div style="transform: translateX(-10%); 
      left: 42px; font-size:26px; margin-top:18px">
      ${close.toLocaleString()}원
    </div>
    `,
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
      enabled: false,
    },
    ordinal: false, // 빈 날짜(주말 등)를 제거하여 일정 간격 유지
    lineWidth: 0,
    tickLength: 0,
    gridLineWidth: 0,
    tickPositioner: function () {
      const positions = this.series[0].xData.filter((timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDay();
        const hours = date.getHours();
        // 주말(토요일, 일요일) 및 장 마감 시간(예: 16시 이후)을 제외하고 표시
        return day !== 0 && day !== 6 && hours >= 9 && hours < 16;
      });
      return positions;
    },
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
      pointPlacement: "off",
    },
  },
  series: [
    {
      name: "price",
      data: [],
      color: primaryColor,
    },
  ],
  legend: {
    enabled: false,
  },
});

chartOptions.value.series[0].data = computed(() => {
  // 데이터가 비어있는 경우 null 반환
  if (Object.keys(props.data).length === 0) return null;

  // props.data의 객체 값을 배열로 변환하여 처리
  const parsedData = Object.values(props.data)
    .filter((item) => item.openPrice != 0)
    .map((item) => {
      const date = new Date(
        item.stockHistoryId.slice(0, 4),
        item.stockHistoryId.slice(4, 6) - 1,
        item.stockHistoryId.slice(6, 8),
        item.stockHistoryId.slice(8, 10),
        item.stockHistoryId.slice(10, 12),
      ).getTime();

      return [date, parseFloat(item.closedPrice)]; // [시간, 종가]
    });

  return parsedData;
});
</script>

<style scoped>
div {
  width: 100%;
}
.highcharts {
  height: 300px;
}
.chartSkeleton {
  height: 280px;
  display: flex;
  justify-content: center; /* 좌우 가운데 정렬 */
  align-items: center; /* 상하 가운데 정렬 */
  border: dashed grey;
}
</style>
