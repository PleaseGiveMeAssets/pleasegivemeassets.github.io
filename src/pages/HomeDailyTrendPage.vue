<template>
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
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const dailyTrendSummarized = reactive([]);
const token = localStorage.getItem("token");

const load = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyTrendSummarized, response.data);
    console.log("load dailyTrendSummarized : ", dailyTrendSummarized);
  } catch (err) {
    console.log("load err : ", err.message);
  }
};
load();
</script>

<style scoped>
h2 {
  font-size: 18px;
  margin-bottom: 10px;
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
