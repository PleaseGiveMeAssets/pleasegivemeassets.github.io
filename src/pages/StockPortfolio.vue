<template>
  <div class="chart-container">
    <div v-if="loading" class="loading-container">
      <!-- 로딩 중일 때 보여줄 내용 (로딩 스피너나 메시지) -->
      <img
        src="/public/images/spinNuguri.png"
        alt="loading"
        class="loading-image"
      />
      <img
        src="/public/images/spinNuguri.png"
        alt="loading"
        class="loading-image"
      />
    </div>

    <div v-else>
      <!-- 차트 로딩 애니메이션 적용 -->
      <div
        v-if="hasAssetData"
        :class="['chart-wrapper', { 'chart-visible': chartVisible }]"
      >
        <button class="edit-button" @click="goToEditPage">편집</button>
        <!-- 도넛 차트 -->
        <div class="chart-content">
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
              <router-link :to="`/stock/${stock.stockId}`" class="noUnderline">
                <div class="stock-info">
                  <p class="stock-name">{{ stock.name }}</p>
                  <p class="stock-shortcode">{{ stock.shortCode }}</p>
                </div>
                <div class="stock-market">
                  {{ formatCurrency(stock.value) }}원
                </div>
              </router-link>
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

const BASE = `${import.meta.env.VITE_API_URL}`;
// JWT 토큰을 가져오는 함수 (토큰이 없을 경우 로그인 페이지로 이동)
const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push({ path: "/login" }); // 로그인 페이지로 이동
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};
// 라우터 객체 가져오기
const router = useRouter();

// 클릭 시 편집 페이지로 이동 함수
const goToEditPage = () => {
  router.push({ path: "/edit" });
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

// 도넛 데이터를 가져오는 함수
const fetchPortfolioData = async () => {
  const token = getToken(); // 토큰 가져오기

  try {
    const response = await axios.get(`${BASE}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
      },
    });
    const portfolioData = response.data;

    // 가져온 데이터를 원하는 형식으로 변환
    stockData.value = portfolioData.map((item) => ({
      name: item.stockName,
      stockId: item.stockId,
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

// 수익률 데이터를 가져오는 함수
const fetchProfitData = async () => {
  const token = getToken(); // 토큰 가져오기

  try {
    const response = await axios.get(`${BASE}/stock/total`, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
      },
    });

    const assetDataResponse = response.data;
    if (assetDataResponse) {
      assetData.value.purchaseAmount = assetDataResponse.totalInvestedAmount;
      assetData.value.totalProfit = assetDataResponse.totalProfitLossAmount;
      assetData.value.evaluationAmount =
        assetDataResponse.totalInvestedAmount +
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

// 그래프 데이터 API 호출 함수
const fetchWeeklyGraphData = async () => {
  const token = getToken(); // 토큰 가져오기

  try {
    const response = await axios.get(`${BASE}/weekly-graph`, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
      },
    });

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
};
const chartVisible = ref(false); // 차트가 로딩 후 나타나는 애니메이션 상태
// 컴포넌트 마운트 시 호출
onMounted(async () => {
  await fetchWeeklyGraphData(); // 데이터를 fetch하는 함수 호출
  await fetchPortfolioData(); // 추가 데이터 가져오기
  await fetchProfitData(); // 추가 데이터 가져오기

  // 로딩이 완료된 후 너구리 애니메이션을 멈추고 차트를 보여줍니다.
  loading.value = false;
  setTimeout(() => {
    chartVisible.value = true; // 차트가 서서히 나타나도록 상태 변경
  }, 100); // 짧은 지연 후 차트 애니메이션 시작
});
</script>

<style scoped>
.chart-container {
  position: relative; /* 편집 버튼을 절대 위치로 설정하기 위해 부모를 상대 위치로 */
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-left: 0;
}
.chart-wrapper {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 1s ease-in-out,
    transform 0.5s ease-in-out;
}
.chart-wrapper.chart-visible {
  opacity: 1;
  transform: scale(1);
}

.edit-button {
  position: absolute;
  top: 10px; /* 상단에서의 위치 조정 */
  right: 10px; /* 우측에서의 위치 조정 */
  z-index: 10; /* 차트보다 앞에 오도록 z-index를 높게 설정 */
  background-color: #ccc;
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #bbb;
}
.edit-button {
  position: absolute;
  top: 20px;
  right: 15px;
  font-size: 12px;
  padding: 4px 8px;
  background-color: #ccc;
  color: black;
  border-radius: 4px;
  cursor: pointer;
}
.edit-button:hover {
  background-color: #bbb;
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
  background-color: black;
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
.loading-image {
  padding-top: 200px;
  width: 200px; /* 원하는 크기로 설정 */
  animation: spin 0.5s linear infinite;
  opacity: 1;
  transition: opacity 0.5s ease-out;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
