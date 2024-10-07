<template>
  <div class="card-ui">
    <h2>일일 동향 요약</h2>
    <p class="report-time">다음 리포트까지 23시간 남았어요!</p>

    <p>
      1. 전일 금융 시장의 주요 이슈<br />
      어제 금융 시장에서는 미국 연방준비제도(Fed)의 금리 동결 전망과 인플레이션
      완화 기대가 맞물리면서 글로벌 증시가 혼조세를 보였습니다. 미국 국채
      수익률이 하락함에..
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

const BASE = "/api/dailytrend";
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
.card-ui {
  background-color: var(--main-card-color);
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.report-time {
  color: #888;
  font-size: 14px;
}
</style>
