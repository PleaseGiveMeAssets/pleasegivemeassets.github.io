<template>
  <div class="recommendations-page">
    <!-- 월, 일 선택 박스 -->
    <div class="unit-selector">
      <label>
        <input v-model="selectedUnit" type="radio" value="day" /> 일
      </label>
      <label>
        <input v-model="selectedUnit" type="radio" value="month" /> 월
      </label>
    </div>

    <!-- 날짜 선택 부분 -->
    <div class="date-picker">
      <!-- 일 선택기 -->
      <input v-if="selectedUnit === 'day'" v-model="currentDate" type="date" />
      <!-- 월 선택기 -->
      <input
        v-if="selectedUnit === 'month'"
        v-model="currentMonth"
        type="month"
      />
    </div>

    <!-- 종목 리스트 -->
    <div class="recommendations">
      <div
        v-for="(stock, sIndex) in recommendStock"
        :key="sIndex"
        class="stock-group"
      >
        <div
          v-for="(rs, rsIndex) in stock.dailyRecommendStockDTOList"
          :key="rsIndex"
          class="stock-item"
        >
          <h2>{{ rs.day }}일</h2>
          <div class="stock-info">
            <div class="stock-name">{{ stock.stockName }}</div>
            <div class="short-code">{{ stock.shortCode }}</div>
          </div>
          <div class="stock-price-info">
            <div class="stock-price">{{ rs.price }}원</div>
            <div
              :class="
                rs.changeAmount > 0 ? 'up' : rs.changeAmount < 0 ? 'down' : ''
              "
            >
              {{ rs.changeAmount > 0 ? "▲" : "▼"
              }}{{ Math.abs(rs.changeAmount) }}원
            </div>
          </div>
          <div
            :class="
              rs.changeAmountRate > 0
                ? 'stock-change-rate up'
                : rs.changeAmountRate < 0
                  ? 'stock-change-rate down'
                  : 'stock-change-rate'
            "
          >
            {{ rs.changeAmountRate }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";

// 기본 URL과 종목 추천 데이터 설정
const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const recommendStock = reactive([]);
const token = localStorage.getItem("token");

// 날짜 정보와 선택 단위
const currentDate = ref(new Date().toISOString().slice(0, 10)); // 기본 현재 날짜
const currentMonth = ref(new Date().toISOString().slice(0, 7)); // 기본 현재 월
const selectedUnit = ref("day"); // 기본 선택 단위는 '일'

// 종목 추천 데이터 불러오기
const createRecommendStock = async (date) => {
  try {
    const response = await axios.get(BASE + `/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Object.assign(recommendStock, response.data); // 데이터 갱신
  } catch (err) {
    console.error("createRecommendStock 에러: ", err.message);
  }
};

// 선택된 단위에 따라 API 호출
watch(selectedUnit, (newUnit) => {
  createRecommendStock(
    newUnit === "day" ? currentDate.value : currentMonth.value,
  );
});

// 초기 API 호출
onMounted(() => createRecommendStock(currentDate.value));
</script>

<style scoped>
.recommendations-page {
  padding-top: 100px;
  font-family: Arial, sans-serif;
}

.unit-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.unit-selector label {
  margin: 0 10px;
  font-size: 16px;
}

.date-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.stock-group {
  margin-bottom: 20px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stock-info {
  display: flex;
  flex-direction: column;
}

.stock-price-info {
  display: flex;
  align-items: center;
}

.stock-price {
  font-weight: bold;
  margin-right: 10px;
}

.up {
  color: red;
}

.down {
  color: blue;
}

.stock-change-rate {
  font-weight: bold;
  padding: 5px 10px;
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
</style>
