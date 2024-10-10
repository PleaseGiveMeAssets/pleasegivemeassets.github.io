<template>
  <div class="chart-container">
    <h2>자산 현황</h2>

    <div class="chart-content">
      <!-- 도넛 차트 -->
      <div @click="goToStockSearchList">
        <DoughnutChart
          v-if="stockData.length > 0"
          :data="stockData"
          :width="390"
          :height="350"
        />
      </div>
    </div>
    <!-- 매도 / 매수 buttons -->
    <SellBuyButton />

    <!-- 자산 정보 -->
    <div v-if="hasAssetData" class="asset-info">
      <div class="info-box">
        <p>매수총액</p>
        <p>{{ formatCurrency(assetData.purchaseAmount) }}원</p>
      </div>
      <div class="info-box">
        <p>총 수익</p>
        <p>{{ formatCurrency(assetData.totalProfit) }}원</p>
      </div>
      <div class="info-box">
        <p>평가손익 금액</p>
        <p>{{ formatCurrency(assetData.evaluationAmount) }}원</p>
      </div>
      <div class="info-box">
        <p>현재 수익률</p>
        <p>{{ Math.round(assetData.currentYield) }}%</p>
      </div>
    </div>
    <p v-else>자산 데이터가 없습니다.</p>

    <!-- 라인 차트 -->
    <div class="chart-wra">
      <LineChart
        v-if="lineChartData.labels.length > 0"
        :chart-data="lineChartData"
      />
      <p v-else>수익률 데이터가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DoughnutChart from "../components/DoughnutChart.vue";
import LineChart from "../components/LineChart.vue";
import SellBuyButton from "../components/SellBuyButton.vue";

// 라우터 객체 가져오기
const router = useRouter();

// 클릭 시 페이지 이동 함수
const goToStockSearchList = () => {
  router.push({ path: "/myStocklist" });
};

const assetData = ref({
  purchaseAmount: 0,
  totalProfit: 0,
  evaluationAmount: 0,
  currentYield: 0,
});

const lineChartData = ref({
  labels: [],
  datasets: [
    {
      label: "수익률",
      data: [],
      borderColor: "#42A5F5",
      fill: false,
      tension: 0.1,
    },
  ],
});

const hasAssetData = ref(false);

// 차트 데이터를 저장하는 ref
const stockData = ref([]);

// API로부터 데이터를 가져오는 함수
const fetchPortfolioData = async () => {
  try {
    const response = await axios.get("/api/portfolio");
    const portfolioData = response.data;

    // 가져온 데이터를 원하는 형식으로 변환
    stockData.value = portfolioData.map((item) => ({
      name: item.stockName,
      value: item.totalPrice,
    }));
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
};

const fetchProfitData = async () => {
  try {
    const response = await axios.get("/api/stock/total");
    const assetDataResponse = response.data;
    if (assetDataResponse) {
      assetData.value.purchaseAmount = assetDataResponse.totalInvestedAmount;
      assetData.value.totalProfit = assetDataResponse.totalProfitLossAmount;
      assetData.value.evaluationAmount =
        assetDataResponse.totalProfitLossAmount;
      assetData.value.currentYield =
        assetDataResponse.totalProfitLossPercentage;

      hasAssetData.value = true;
    }
  } catch (error) {
    console.error("Error fetching profit data:", error);
    hasAssetData.value = false;
  }
};

const formatCurrency = (value) => Math.round(value).toLocaleString();

onMounted(() => {
  fetchPortfolioData();
  fetchProfitData();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.chart-content {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능한 마우스 포인터 추가 */
}

.chart-wrapper {
  width: 50%;
  cursor: pointer; /* 클릭 가능한 포인터 추가 */
}

.legend {
  margin-left: 20px;
  font-size: 12px;
}

.legend ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}

.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.color-box {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
}

.asset-info {
  width: 350px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.info-box {
  padding: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>
