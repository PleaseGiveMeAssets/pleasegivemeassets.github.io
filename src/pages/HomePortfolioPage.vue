<template>
  <h2>포트폴리오</h2>
  <div class="home-portfolio-page">
    <canvas id="homePortfolioPage"></canvas>
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

const BASE = `${import.meta.env.VITE_API_URL}/stockportfolio`;
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
</style>
