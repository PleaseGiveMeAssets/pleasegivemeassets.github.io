<template>
  <div class="card-ui">
    <h2>포트폴리오</h2>
    <div class="home-portfolio-page">
      <canvas id="homePortfolioPage"></canvas>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { onMounted } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

const BASE = "/api/stockportfolio";
const portfolio = reactive([]);
const token = localStorage.getItem("token");

const load = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(portfolio, response.data);

    console.log("load portfolio : ", portfolio);
  } catch (err) {
    console.log("load err : ", err.message);
  }
};
load();

// Chart.js에 필요한 요소들을 등록합니다.
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

onMounted(() => {
  const ctx = document.getElementById("homePortfolioPage").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["엔비디아", "NAVER", "대한항공", "페이스북", "애플", "제일제당"],
      datasets: [
        {
          data: [30, 25, 15, 9, 8, 6],
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
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
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

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
