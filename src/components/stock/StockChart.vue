<template>
  <div class="card-ui">
    <div v-if="chartOptions.series[0].data !== null">
      <highcharts
        ref="highchartsRef"
        class=""
        :options="chartOptions"
      ></highcharts>
    </div>
    <div v-else>
      <div class="chartSkeleton">차트 데이터가 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
let lastLabel = null;

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
      enabled: true,
      rotation: -10, // 라벨을 수평으로 설정
      style: {
        fontSize: "10px",
      },
      formatter: function () {
        const parts = this.value.split(" ");
        let formattedDate = parts[0];
        let time = parts[1];

        const month = formattedDate.slice(0, -1);
        const day = time.slice(0, -1);

        const label = `${month}월 ${day}일`;
        if (label === lastLabel) {
          return "";
        } else {
          lastLabel = label;
          return label;
        }
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
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
  legend: {
    enabled: false,
  },
});

const parsedData = computed(() => {
  if (Object.keys(props.data).length === 0) return null;

  const dataArray = Object.values(props.data)
    .filter((item) => item.openPrice != 0)
    .map((item) => {
      const date = new Date(
        item.stockHistoryId.slice(0, 4),
        item.stockHistoryId.slice(4, 6) - 1,
        item.stockHistoryId.slice(6, 8),
        item.stockHistoryId.slice(8, 10),
        item.stockHistoryId.slice(10, 12),
      );

      const formattedDate = date.toLocaleDateString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        date: formattedDate,
        open: parseFloat(item.openPrice),
        close: parseFloat(item.closedPrice),
        high: parseFloat(item.highPrice),
        low: parseFloat(item.lowPrice),
      };
    });

  // 차트 데이터에 마지막 값을 기준으로 high, low, open, close 설정
  if (dataArray.length > 0) {
    const lastData = dataArray[dataArray.length - 1];
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    chartOptions.value.subtitle.text = `
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">시</span> ${lastData.open.toLocaleString()}
    </span>
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">종</span> ${lastData.close.toLocaleString()}
    </span>
    <span style="display: inline-block; margin-right: 15px;">
      <span style="color:#666666">저</span> ${lastData.low.toLocaleString()}
    </span>
    <span style="display: inline-block;">
      <span style="color:#666666">고</span> ${lastData.high.toLocaleString()}
    </span>
    <div style="transform: translateX(-10%); 
      left: 42px; font-size:26px; margin-top:18px">
      ${lastData.close.toLocaleString()}원
    </div>
    `;
  }

  return dataArray.map((item) => [item.date, item.close]);
});

chartOptions.value.series[0].data = parsedData;
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
