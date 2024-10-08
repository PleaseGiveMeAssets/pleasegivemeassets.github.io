<template>
  <section class="pgma-logo">
    <h2>PGMA(로고)</h2>
    <img
      src="https://via.placeholder.com/300x100?text=표지+그림+들어갈+곳+위딩+:+일일+종목+동향"
      alt="표지 그림"
    />
  </section>

  <section class="latest-trend">
    <h2>PGMA(로고)</h2>
    <h3>{{ trend.recentTrendTitle }}</h3>
    <p>
      {{ trend.recentTrendContent }}
    </p>
  </section>

  <section class="stock-trend">
    <h3>{{ trend.stockTrendTitle }}</h3>
    <p>
      {{ trend.stockTrendContent }}
    </p>
  </section>

  <section class="market-index">
    <h2>PGMA(로고)</h2>
    <div class="index-cards">
      <div class="index-card">
        <h4>코스닥</h4>
        <p class="price">{{ trend.kosdaqPrice }}</p>
        <p class="change" :class="trend.kosdaqProfitRate < 0 ? 'down' : 'up'">
          {{ trend.kosdaqProfitRate }}%
        </p>
      </div>
      <div class="index-card">
        <h4>코스피</h4>
        <p class="price">{{ trend.kospiPrice }}</p>
        <p class="change" :class="trend.kospiProfitRate < 0 ? 'down' : 'up'">
          {{ trend.kospiProfitRate }}%
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const trend = reactive([]);
const token = localStorage.getItem("token");

const createTrend = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(trend, response.data);
  } catch (err) {
    console.log("createTrend err : ", err.message);
  }
};

onMounted(() => {
  createTrend();
});
</script>

<style scoped>
.latest-trend,
.stock-trend {
  margin-bottom: 20px;
}

.market-index {
  margin-bottom: 20px;
}

.index-cards {
  display: flex;
  justify-content: space-between;
}

.index-card {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  width: 45%;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.change.up {
  color: green;
}

.change.down {
  color: red;
}

.pgma-logo img {
  margin: 20px 0;
  width: 100%;
}
</style>
