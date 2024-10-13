<template>
  <div class="card-ui">
    <section>
      <img class="logo" src="@/assets/icons/report-logo.svg" />
      <div v-for="(stock, sIndex) in dailyRecommendStock" :key="sIndex">
        <div
          v-for="(recommendStock, rsIndex) in stock.dailyRecommendStockDTOList"
          :key="rsIndex"
        >
          <h3>{{ recommendStock.stockName }}</h3>
          <p>{{ recommendStock.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("accessToken");

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
.card-ui {
  background-color: var(--main-card-color);
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
}

.logo {
  margin-bottom: 20px;
  height: 50px;
  width: 50px;
}
</style>
