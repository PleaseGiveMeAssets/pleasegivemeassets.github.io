<template>
  <div class="card-ui">
    <section class="recommendations">
      <h2>일일추천종목</h2>
      <div class="home-recommend-stock-page">
        <div
          v-for="(stock, index) in dailyRecommendStock"
          :key="index"
          class="stock-item"
        >
          <div class="stock-name">{{ stock.stockName }}</div>
          <div class="stock-price">{{ stock.price }}원</div>
          <div class="stock-change" :class="stock.change > 0 ? 'up' : 'down'">
            {{ stock.change > 0 ? "+" : "" }}{{ stock.change }}원 ({{
              stock.changePercentage
            }}%)
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("token");

const createRecommendStock = async (date) => {
  try {
    const response = await axios.get(date ? `${BASE}/${date}` : BASE, {
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
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.home-recommend-stock-page {
  display: flex;
  flex-direction: column;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.stock-name {
  font-weight: bold;
}

.stock-price {
  color: #333;
}

.stock-change.up {
  color: red;
}

.stock-change.down {
  color: blue;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.recommendations {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
</style>
