<template>
  <section class="recommended-stocks">
    <h2>PGMA(로고)</h2>
    <div v-for="(stock, sIndex) in dailyRecommendStock" :key="sIndex">
      <h3>{{ stock.stockName }}</h3>
      <p
        v-for="(recommendStock, rsIndex) in stock.dailyRecommendStockDTOList"
        :key="rsIndex"
      >
        {{ recommendStock.content }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("token");

const createRecommendStock = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyRecommendStock, response.data);
  } catch (err) {
    console.log("createRecommendStock err : ", err.message);
  }
};

onMounted(() => {
  createRecommendStock();
});
</script>

<style scoped>
.recommended-stocks {
  margin-bottom: 20px;
}
</style>
