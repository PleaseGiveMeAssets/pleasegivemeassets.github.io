<template>
  <div class="daily-report">
    <h2>일일 동향 요약</h2>
    <p class="report-time">
      다음 리포트까지 {{ dailyTrendSummarized.hour }}시간 남았어요!
    </p>
  </div>
  <div class="card-ui">
    <section>
      <p>{{ dailyTrendSummarized.dailyTrendSummarizedTitle }}</p>
      <p>{{ dailyTrendSummarized.dailyTrendSummarizedContent }}</p>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

// 기본 URL과 동향 요약 데이터 설정
const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const dailyTrendSummarized = reactive({});
const token = localStorage.getItem("token");

// 동향 요약 데이터 불러오기
const createDailyTrend = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Object.assign(dailyTrendSummarized, response.data);
  } catch (err) {
    console.error("createDailyTrend 에러: ", err.message);
  }
};

// 컴포넌트 마운트 시 API 호출
onMounted(createDailyTrend);
</script>

<style scoped>
h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.card-ui {
  background-color: var(--main-card-color);
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.report-time {
  color: #888;
  font-size: 14px;
  margin-left: auto;
  padding-top: 10px;
}

.daily-report {
  display: flex;
}
</style>
