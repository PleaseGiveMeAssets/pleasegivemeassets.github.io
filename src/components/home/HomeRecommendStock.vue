<template>
  <div class="recommend-stock">
    <h2>일일추천종목</h2>
    <p class="ai-stock">AI 추천 종목 현황</p>
    <img class="next-button" src="@/assets/icons/nextButton-icon.svg" />
  </div>
  <div class="card-ui">
    <section>
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
              <div class="stock-name">{{ recommendStock.stockName }}</div>
              <div class="short-code">{{ recommendStock.shortCode }}</div>
            </div>
            <div class="price-change-container">
              <div class="stock-price">{{ recommendStock.price }}원</div>
              <div
                class="stock-change"
                :class="
                  recommendStock.changeAmount > 0
                    ? 'up'
                    : recommendStock.changeAmount < 0
                      ? 'down'
                      : ''
                "
              >
                {{
                  recommendStock.changeAmount > 0
                    ? "▲"
                    : recommendStock.changeAmount < 0
                      ? "▼"
                      : ""
                }}{{ Math.abs(recommendStock.changeAmount) }}원
              </div>
            </div>
            <div
              :class="
                recommendStock.changeAmountRate > 0
                  ? 'stock-change-rate up'
                  : recommendStock.changeAmountRate < 0
                    ? 'stock-change-rate down'
                    : 'stock-change-rate'
              "
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

// 추천 종목 데이터를 불러오기 위한 기본 URL 설정
const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("accessToken");

// 추천 종목 API 호출 함수
const createRecommendStock = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyRecommendStock, response.data);
  } catch (err) {
    console.error("createRecommendStock 에러: ", err.message);
  }
};

// 컴포넌트 마운트 시 추천 종목 데이터를 불러오기 위한 API 호출
onMounted(createRecommendStock);
</script>

<style scoped>
.card-ui {
  background-color: var(--main-card-color);
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.home-recommend-stock {
  display: flex;
  flex-direction: column;
}

.stock-item {
  margin-bottom: 10px;
}

.stock-price-info {
  display: flex;
  width: 100%; /* 전체 너비 사용 */
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.stock-info {
  flex: 1;
  text-align: left; /* 좌측 정렬 */
}

.stock-name {
  font-weight: bold;
}

.price-change-container {
  flex: 1;
  text-align: right; /* 가운데 정렬 */
  padding-right: 20px;
}

.stock-price {
  color: #333;
}

.stock-change {
  color: black; /* 기본값 */
}

.stock-change.up {
  color: red; /* 상승 */
}

.stock-change.down {
  color: blue; /* 하락 */
}

.stock-change-rate {
  flex: none;
  width: 20%;
  text-align: right; /* 우측 정렬 */
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 8px;
  background-color: gray;
  color: white;
}

.stock-change-rate.up {
  background-color: red;
}

.stock-change-rate.down {
  background-color: blue;
}

.short-code {
  color: #888;
  font-size: 14px;
}

.recommend-stock {
  display: flex;
}

.ai-stock {
  font-size: 16px;
  margin-left: auto;
  padding-top: 10px;
}

.next-button {
  margin-left: 10px;
  padding-right: 5px;
  padding-bottom: 5px;
}
</style>
