<template>
  <div class="chart-container">
    <div v-if="loading">
      <!-- 로딩 중일 때 보여줄 내용 (로딩 스피너나 메시지) -->
      <p>자산 데이터를 불러오는 중입니다...</p>
    </div>

    <div v-else>
      <div v-if="hasAssetData">
        <!-- 도넛 차트 -->
        <div class="chart-content" @click="goToStockSearchList">
          <DoughnutChart
            v-if="stockData.length > 0"
            :data="stockData"
            :width="390"
            :height="350"
          />
        </div>
        <!-- 매도 / 매수 buttons -->
        <SellBuyButton />
        <br />

        <!-- 자산 정보 -->
        <h6>나의 자산</h6>
        <div class="asset-info">
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
        <br />
        <!-- 상위 5개 종목 표시 -->
        <h6>주요 투자 종목</h6>
        <div v-if="topStocks && topStocks.length > 0" class="top-stocks">
          <ul class="stock-list">
            <li
              v-for="(stock, index) in topStocks"
              :key="index"
              class="stock-item"
            >
              <div class="stock-info">
                <p class="stock-name">{{ stock.name }}</p>
                <p class="stock-shortcode">{{ stock.shortCode }}</p>
              </div>
              <div class="stock-market">
                {{ formatCurrency(stock.value) }}원
              </div>
            </li>
          </ul>
        </div>
        <br />

        <!-- 라인 차트 -->
        <h6>주간 투자 수익률</h6>
        <div class="chart-wra">
          <LineChart
            v-if="lineChartData.labels.length > 0"
            :chart-data="lineChartData"
          />
          <p v-else>수익률 데이터가 없습니다.</p>
        </div>
      </div>

      <!-- 자산 데이터가 없을 경우 EmptyAssetBox 컴포넌트 사용 -->
      <EmptyAssetBox v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DoughnutChart from "../components/DoughnutChart.vue";
import LineChart from "../components/LineChart.vue";
import EmptyAssetBox from "../components/EmptyAssetBox.vue";
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
      tension: 1,
    },
  ],
});

const hasAssetData = ref(false);
const loading = ref(true); // 데이터를 불러오는 중인지 여부를 추적하는 변수

// 차트 데이터를 저장하는 ref
const stockData = ref([]);
const topStocks = ref([]);
// API로부터 데이터를 가져오는 함수
const fetchPortfolioData = async () => {
  try {
    const response = await axios.get("/api/portfolio");
    const portfolioData = response.data;

    // 가져온 데이터를 원하는 형식으로 변환
    stockData.value = portfolioData.map((item) => ({
      name: item.stockName,
      shortCode: item.shortCode,
      value: item.totalPrice,
    }));
    // 상위 5개 종목 추출
    topStocks.value = stockData.value
      .sort((a, b) => b.value - a.value)
      .slice(0, 3); // 상위 5개 종목만 추출
    hasAssetData.value = stockData.value.length > 0;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  } finally {
    loading.value = false; // 로딩이 완료되었을 때 로딩 상태를 false로 변경
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

onMounted(async () => {
  try {
    const response = await axios.get("/api/weekly-graph");
    const stockData = response.data;

    // 차트의 라벨로 사용할 날짜 배열
    const labels = stockData.map((item) => item.stockDate);

    // 수익률 계산 (수익률 = (totalProfit / totalAmount) * 100)
    const profitRates = stockData.map((item) => {
      if (item.totalAmount !== 0) {
        return ((item.totalProfit / item.totalAmount) * 100).toFixed(2);
      } else {
        return 0; // totalAmount가 0일 때 수익률은 0으로 처리
      }
    });

    // 차트 데이터 설정
    lineChartData.value.labels = labels;
    lineChartData.value.datasets[0].data = profitRates;
  } catch (error) {
    console.error("Error fetching stock portfolio info:", error);
  }
  fetchPortfolioData();
  fetchProfitData();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 10px;
  padding-left: 8px;
}

.chart-content {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능한 마우스 포인터 추가 */
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
.chart-wra {
  width: 350px;
  padding: 20px;
}
.top-stocks {
  margin-top: 0;
  padding: 0 15px;
}

h6 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

.stock-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.stock-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.stock-shortcode {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.stock-market {
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

@keyframes borderPulse {
  0% {
    border-color: #ccc;
  }
  25% {
    border-color: #ff0000;
  }
  50% {
    border-color: #00ff00;
  }
  75% {
    border-color: #0000ff;
  }
  100% {
    border-color: #ccc;
  }
}
@keyframes textColorPulse {
  0% {
    color: #ff5722; /* 시작 색상 */
  }
  25% {
    color: #0909e3; /* 시작 색상 */
  }
  50% {
    color: #ccc; /* 중간 색상 */
  }
  75% {
    color: #00ff00; /* 중간 색상 */
  }
  100% {
    color: #ff5722; /* 끝 색상 (원래 색상) */
  }
}
/* 모든 요소의 border에 애니메이션을 적용 */
* {
  border: 2px solid #ccc; /* 기본 테두리 설정 */
  animation: borderPulse 1s infinite;
}
/* 모든 요소의 텍스트에 애니메이션 적용 */
* {
  animation: textColorPulse 1s infinite;
}
</style>
