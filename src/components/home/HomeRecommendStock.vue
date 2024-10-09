<template>
  <div class="card-ui">
    <section class="recommendations">
      <h2>일일추천종목</h2>
      <div class="home-recommend-stock">
        <div
          v-for="(stock, sIndex) in dailyRecommendStock"
          :key="sIndex"
          class="stock-item"
        >
          <div
            v-for="(
              recommendStock, rsIndex
            ) in stock.dailyRecommendStockDTOList"
            :key="rsIndex"
            class="stock-price-info"
          >
            <div class="stock-info">
              <div class="stock-name">{{ stock.stockName }}</div>
              <div class="short-code">{{ stock.shortCode }}</div>
            </div>
            <div class="price-change-container">
              <div class="stock-price">{{ recommendStock.price }}원</div>
              <div
                class="stock-change"
                :class="recommendStock.changeAmount > 0 ? 'up' : 'down'"
              >
                {{ recommendStock.changeAmount }}원
              </div>
            </div>
            <div
              class="stock-change-rate"
              :class="recommendStock.changeAmountRate > 0 ? 'up' : 'down'"
            >
              {{ recommendStock.changeAmountRate }}%
            </div>
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

.recommendations {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}

.home-recommend-stock {
  display: flex;
  flex-direction: column;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.stock-price-info {
  display: flex;
  justify-content: space-between; /* 좌측 끝, 중앙, 우측 끝으로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%; /* 전체 너비 사용 */
}

.stock-info {
  flex: 1; /* 첫 번째 항목을 좌측 끝으로 배치 */
  text-align: left; /* 왼쪽 정렬 */
}

.stock-name {
  font-weight: bold;
}

.price-change-container {
  flex: 1; /* 두 번째 항목을 중앙에 배치 */
  text-align: center; /* 중앙 정렬 */
}

.stock-price {
  color: #333;
}

.stock-change {
  /* 기본 색상 설정 */
  color: black; /* 기본 색상 */
}

.stock-change.up {
  color: red; /* 양수일 때 빨간색 */
}

.stock-change.down {
  color: blue; /* 음수일 때 파란색 */
}

.stock-change-rate {
  flex: 1; /* 세 번째 항목을 우측 끝으로 배치 */
  text-align: right; /* 오른쪽 정렬 */
  /* 기본 색상 설정 */
  color: black; /* 기본 색상 */
}

.stock-change-rate.up {
  color: red; /* 양수일 때 빨간색 */
}

.stock-change-rate.down {
  color: blue; /* 음수일 때 파란색 */
}
</style>
