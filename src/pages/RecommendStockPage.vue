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
      <flat-pickr
        v-if="selectedUnit === 'day'"
        v-model="currentDate"
        :config="dayPickerConfig"
        @on-change="handleDateChange"
      />
      <!-- 월 선택기 -->
      <flat-pickr
        v-if="selectedUnit === 'month'"
        v-model="currentMonth"
        :config="monthPickerConfig"
        @on-change="handleMonthChange"
      />
    </div>

    <!-- 종목 리스트 -->
    <div class="recommendations">
      <div
        v-for="(stockGroup, index) in stockGroups"
        :key="index"
        class="stock-group"
      >
        <h2>{{ stockGroup.date }}</h2>
        <div
          v-for="(stock, sIndex) in stockGroup.stocks"
          :key="sIndex"
          class="stock-item"
        >
          <div class="stock-info">
            <div class="stock-name">{{ stock.name }}</div>
            <div class="short-code">{{ stock.shortCode }}</div>
          </div>
          <div class="stock-price-info">
            <div class="stock-price">{{ stock.price }}원</div>
            <div
              class="stock-change"
              :class="
                stock.changeAmount > 0
                  ? 'up'
                  : stock.changeAmount < 0
                    ? 'down'
                    : ''
              "
            >
              {{ stock.changeAmount > 0 ? "▲" : "▼"
              }}{{ Math.abs(stock.changeAmount) }}원
            </div>
          </div>
          <div
            class="stock-change-rate"
            :class="
              stock.changeRate > 0 ? 'up' : stock.changeRate < 0 ? 'down' : ''
            "
          >
            {{ stock.changeRate }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FlatPickr from "vue-flatpickr-component"; // Flatpickr import
import "flatpickr/dist/flatpickr.css"; // Flatpickr CSS import

// 현재 날짜와 주식 데이터를 관리하는 ref
const currentDate = ref(new Date()); // 현재 날짜
const currentMonth = ref(new Date()); // 현재 월
const selectedUnit = ref("day"); // 'day' 또는 'month' 선택을 위한 ref

const stockGroups = ref([
  {
    date: "13일",
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
    date: "12일",
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
    date: "11일",
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

// 일 선택기 설정
const dayPickerConfig = computed(() => {
  return {
    dateFormat: "Y-m-d",
    enable: [(date) => true],
    disable: [],
  };
});

// 월 선택기 설정
const monthPickerConfig = computed(() => {
  return {
    dateFormat: "Y-m",
    enable: [(date) => true],
    disable: [],
  };
});

// 날짜 변경 핸들러
const handleDateChange = (selectedDates) => {
  if (selectedDates.length) {
    currentDate.value = selectedDates[0];
  }
};

// 월 변경 핸들러
const handleMonthChange = (selectedDates) => {
  if (selectedDates.length) {
    currentMonth.value = selectedDates[0];
    // 여기서 선택한 월에 맞는 데이터 필터링 등을 수행할 수 있습니다.
  }
};
</script>

<style scoped>
.recommendations-page {
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
