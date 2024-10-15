<template>
  <div class="card-ui">
    <section>
      <img class="logo" src="@/assets/icons/report-logo.svg" />
      <img class="cover" src="@/assets/icons/report-cover.svg" />
    </section>
  </div>

  <div class="card-ui">
    <section>
      <img class="logo" src="@/assets/icons/report-logo.svg" />
      <h3>{{ trend.recentTrendTitle }}</h3>
      <p>
        {{ trend.recentTrendContent }}
      </p>
    </section>

    <section>
      <h3>{{ trend.stockTrendTitle }}</h3>
      <p>
        {{ trend.stockTrendContent }}
      </p>
    </section>
  </div>

  <div class="card-ui">
    <section>
      <img class="logo" src="@/assets/icons/report-logo.svg" />
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
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const trend = reactive([]);
const token = localStorage.getItem("accessToken");
const emit = defineEmits(["loaded", "onComponentLoaded"]);

const createTrend = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(trend, response.data);
  } catch (err) {
    console.error("createTrend err : ", err.message);
  }
};

onMounted(async () => {
  await createTrend();
  emit("loaded");
});
</script>

<style scoped>
.card-ui {
  background-color: var(--main-card-color);
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
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

.logo {
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
}

.cover {
  height: 60px;
  width: auto;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
