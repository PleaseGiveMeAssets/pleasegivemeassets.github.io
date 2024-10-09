<template>
  <div class="card-ui">
    <header class="header">
      <h1>PGMA(로고)</h1>
      <p class="report-time">다음 리포트까지 23시간 남았어요!</p>
    </header>

    <section class="summary">
      <h2>일일 동향 요약</h2>
      <p>
        {{ dailyTrendSummarized.dailyTrendSummarizedTitle }}<br />
        {{ dailyTrendSummarized.dailyTrendSummarizedContent }}
      </p>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const dailyTrendSummarized = reactive([]);
const token = localStorage.getItem("token");

const createDailyTrend = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyTrendSummarized, response.data);
  } catch (err) {
    console.log("createDailyTrend err : ", err.message);
  }
};

onMounted(() => {
  createDailyTrend();
});
</script>

<style scoped>
h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.card-ui {
  background-color: var(--main-card-color);
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.summary {
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.report-time {
  color: #888;
  font-size: 14px;
}
</style>
