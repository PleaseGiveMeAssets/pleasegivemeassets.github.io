<template>
  <h2>일일 동향 요약</h2>
  <p>
    1. 전일 금융 시장의 주요 이슈<br />
    어제 금융 시장에서는 미국 연방준비제도(Fed)의 금리 동결 전망과 인플레이션
    완화 기대가 맞물리면서 글로벌 증시가 혼조세를 보였습니다. 미국 국채 수익률이
    하락함에..
  </p>
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
</style>
