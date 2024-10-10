<template>
  <div class="card-ui">
    <section>
      <h2>포트폴리오</h2>
      <div class="home-portfolio">
        <canvas id="homePortfolio"></canvas>
      </div>
    </section>
  </div>
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

// Chart.js 등록
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// API URL 및 상태 관리
const BASE = `${import.meta.env.VITE_API_URL}/stockportfolio`;
const portfolio = reactive([]);
const token = localStorage.getItem("token");
let chartInstance = null; // 차트 인스턴스

// 포트폴리오 데이터 로드 및 차트 초기화
const createPortfolio = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });

    portfolio.push(...response.data); // 데이터 추가
    await nextTick(); // DOM 업데이트 후 차트 생성
    createChart();
  } catch (err) {
    console.error("createPortfolio error:", err.message);
  }
};

// 랜덤 색상 생성 함수
const generateColors = (numColors) =>
  Array.from({ length: numColors }, (_, i) => {
    const hue = (i * 360) / numColors;
    const saturation = 70 + Math.random() * 10;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });

// 차트 생성 함수
const createChart = () => {
  const canvasElement = document.getElementById("homePortfolio");
  if (!canvasElement || portfolio.length === 0) {
    console.log("캔버스 또는 포트폴리오 데이터가 없습니다.");
    return;
  }

  const ctx = canvasElement.getContext("2d");
  const stockName = portfolio.map((item) => item.stockName);
  const totalValue = portfolio.map(
    (item) => item.totalPrice * item.totalQuantity,
  );

  const chartData = {
    labels: stockName,
    datasets: [
      {
        data: totalValue,
        backgroundColor: generateColors(stockName.length), // 생성된 색상 적용
      },
    ],
  };

  // 기존 차트 삭제 후 새로 생성
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

// 컴포넌트가 마운트되면 포트폴리오 데이터 생성
onMounted(createPortfolio);
</script>

<style scoped>
.home-portfolio {
  width: 100%;
  height: 300px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
