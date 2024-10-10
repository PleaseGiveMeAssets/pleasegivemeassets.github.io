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
      <input
        v-if="selectedUnit === 'day'"
        v-model="currentDate"
        type="date"
        @change="handleDateChange"
      />
      <!-- 월 선택기 -->
      <input
        v-if="selectedUnit === 'month'"
        v-model="currentMonth"
        type="month"
        @change="handleMonthChange"
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
              class="stock-change"
              :class="
                rs.changeAmount > 0 ? 'up' : rs.changeAmount < 0 ? 'down' : ''
              "
            >
              {{ rs.changeAmount > 0 ? "▲" : "▼"
              }}{{ Math.abs(rs.changeAmount) }}원
            </div>
          </div>
          <div
            class="stock-change-rate"
            :class="
              rs.changeAmountRate > 0
                ? 'up'
                : rs.changeAmountRate < 0
                  ? 'down'
                  : ''
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
import { onMounted, reactive, ref } from "vue";

// 현재 날짜와 주식 데이터를 관리하는 ref
const currentDate = ref(new Date().toISOString().slice(0, 10)); // 현재 날짜
const currentMonth = ref(new Date().toISOString().slice(0, 7)); // 현재 월
const selectedUnit = ref("day"); // 'day' 또는 'month' 선택을 위한 ref

const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const recommendStock = reactive([]);
const token = localStorage.getItem("token");

const createRecommendStock = async (date) => {
  try {
    const response = await axios.get(BASE + `/${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(recommendStock, response.data);

    console.log("Hi : ", recommendStock);
  } catch (err) {
    console.log("createRecommendStock err : ", err.message);
  }
};

onMounted(() => {
  createRecommendStock(currentDate.value);
});

const stockGroups = ref([
  {
    date: "2024-10-13",
    stocks: [
      {
        name: "삼성전자",
        shortCode: "Samsung Ele..",
        price: 66700,
        changeAmount: -100,
        changeRate: -0.02,
      },
      {
        name: "한미약품",
        shortCode: "Hanmi medi..",
        price: 66700,
        changeAmount: -100,
        changeRate: -0.2,
      },
      {
        name: "카카오 모빌리티",
        shortCode: "Hanmi medi..",
        price: 10110,
        changeAmount: 0,
        changeRate: 0,
      },
    ],
  },
  {
    date: "2024-10-12",
    stocks: [
      {
        name: "에스케이텔레콤",
        shortCode: "종목코드",
        price: 20000,
        changeAmount: 100,
        changeRate: 0.02,
      },
      {
        name: "엘지전자",
        shortCode: "종목코드",
        price: 633300,
        changeAmount: 6000,
        changeRate: 2,
      },
    ],
  },
  {
    date: "2024-10-11",
    stocks: [
      {
        name: "대우전자",
        shortCode: "Daeu Ele..",
        price: 100,
        changeAmount: 1,
        changeRate: 1,
      },
    ],
  },
]);

// 날짜 변경 핸들러
const handleDateChange = (event) => {
  currentDate.value = event.target.value;
  createRecommendStock(currentDate.value);
};

// 월 변경 핸들러
const handleMonthChange = (event) => {
  currentMonth.value = event.target.value;
  createRecommendStock(currentMonth.value);
};
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

.stock-change {
  font-weight: bold;
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
}

.stock-change-rate.up {
  background-color: red;
  color: white;
}

.stock-change-rate.down {
  background-color: blue;
  color: white;
}

.stock-change-rate {
  background-color: gray;
  color: white;
}
</style>
