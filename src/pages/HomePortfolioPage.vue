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

// 데이터 로드 함수 호출
onMounted(() => {
  createPortfolio();
});

// 랜덤 배경색을 생성하는 함수
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor((i * 360) / numColors); // 색상 값 (0-360도 사이로 균등 분포)
    const saturation = 70 + Math.random() * 10; // 채도 (70% 이상)
    const lightness = 50 + Math.random() * 10; // 밝기 (50% 이상)
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
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

    // 동적으로 색상 배열 생성
    const backgroundColors = generateColors(stockName.length);

    const chartData = {
      labels: stockName,
      datasets: [
        {
          data: totalValue,
          backgroundColor: backgroundColors, // 동적으로 생성된 색상을 차트에 적용
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
