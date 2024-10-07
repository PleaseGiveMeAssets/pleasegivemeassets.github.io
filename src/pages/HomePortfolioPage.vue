<template>
  <section class="portfolio">
    <h2>포트폴리오</h2>
    <div class="home-portfolio-page">
      <canvas id="homePortfolioPage"></canvas>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, nextTick } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const BASE = `${import.meta.env.VITE_API_URL}/stockportfolio`;
const portfolio = reactive([]);
let chartInstance = null; // 차트 인스턴스 관리
const token = localStorage.getItem("token");

const createPortfolio = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    portfolio.push(...response.data); // reactive 객체에 데이터를 추가

    // 차트가 그려질 수 있도록 데이터 로드 후 차트 초기화
    await nextTick(); // DOM 업데이트 후 차트를 생성하기 위함
    createChart(); // 차트를 그리는 함수 호출
  } catch (err) {
    console.log("createPortfolio error : ", err.message);
  }
};

// 차트 생성 함수
const createChart = () => {
  const canvasElement = document.getElementById("homePortfolioPage");
  if (!canvasElement) {
    console.log("캔버스 데이터를 찾을 수 없습니다.");
    return;
  }

  const ctx = canvasElement.getContext("2d");

  if (portfolio.length > 0) {
    const stockName = portfolio.map((item) => item.stockName);
    const totalValue = portfolio.map(
      (item) => item.totalPrice * item.totalQuantity,
    );

    const chartData = {
      labels: stockName,
      datasets: [
        {
          data: totalValue,
          backgroundColor: [
            "#4A90E2",
            "#9013FE",
            "#50E3C2",
            "#B8E986",
            "#E4B8F0",
            "#9B9B9B",
          ],
        },
      ],
    };

    // 기존 차트가 있으면 먼저 삭제
    if (chartInstance) {
      chartInstance.destroy();
    }

    // 새로운 차트를 생성하고 인스턴스 저장
    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  } else {
    console.log("포트폴리오 데이터가 비어 있습니다.");
  }
};

// 데이터 로드 함수 호출
onMounted(() => {
  createPortfolio();
});
</script>

<style scoped>
.home-portfolio-page {
  width: 100%;
  height: 300px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.portfolio {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
</style>
