<template>
  <section class="recommended-stocks">
    <h2>PGMA(로고)</h2>
    <h3>추천 종목</h3>
    <p>내용</p>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

const BASE = "/api/dailyrecommend";
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("token");

const load = async (date) => {
  try {
    const response = await axios.get(date ? `${BASE}/${date}` : BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyRecommendStock, response.data);

    console.log("load dailyRecommendStock : ", dailyRecommendStock);
  } catch (err) {
    console.log("load err : ", err.message);
  }
};
load();
</script>

<style scoped>
.recommended-stocks {
  margin-bottom: 20px;
}
</style>
