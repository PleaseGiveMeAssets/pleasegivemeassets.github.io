<template>
  <div class="stock-search-container">
    <!-- 검색 바 -->
    <div class="search-bar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="🔍 검색"
        @input="onInputChange"
        @compositionend="onCompositionEnd"
      />
      <button @click="clearSearch">취소</button>
    </div>
    <p class="my-stock-title">종목</p>

    <!-- 주식 목록 -->
    <ul v-if="stocks.length > 0" class="stock-list">
      <li v-for="(stock, index) in stocks" :key="index" class="stock-item">
        <div class="stock-name">
          {{ stock.stockName }}
          <span class="stock-eng">{{ stock.engName }}</span>
        </div>
        <div class="stock-info">
          <p v-if="stock.shortCode">{{ stock.shortCode }}</p>
          <p>{{ stock.market }}</p>
        </div>
      </li>
    </ul>

    <!-- 검색 결과가 없을 때 메시지 표시 -->
    <div v-if="!stocks.length && searchTerm.length > 0">
      <p>해당 종목이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import _ from "lodash";

const searchTerm = ref("");
const stocks = ref([]);
const isComposing = ref(false);

// 디바운스를 이용한 검색
const debouncedFetchStockList = _.debounce(fetchStockList, 300);

// 검색어 변경 시 호출되는 함수
const onInputChange = (event) => {
  searchTerm.value = event.target.value;
  if (!isComposing.value) {
    debouncedFetchStockList();
  }
};

// 한글 입력이 끝난 후 호출되는 함수
const onCompositionEnd = () => {
  isComposing.value = false;
  debouncedFetchStockList(); // 한글 입력이 끝난 후 검색 실행
};

// 검색 결과 가져오는 함수
async function fetchStockList() {
  if (searchTerm.value.trim().length > 0) {
    try {
      const response = await axios.get("/api/stock/search", {
        params: { searchStock: searchTerm.value },
      });
      stocks.value = response.data;
    } catch (error) {
      console.error("Stock search error:", error);
      stocks.value = []; // 오류 발생 시 목록 초기화
    }
  } else {
    stocks.value = []; // 검색어가 없을 경우 목록 초기화
  }
}

// 검색어 초기화 함수
const clearSearch = () => {
  searchTerm.value = "";
  stocks.value = [];
};
</script>

<style scoped>
.stock-search-container {
  padding-top: 48px;
  border-left: 0;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}

input[type="text"] {
  width: 85%;
  padding: 8px;
  border: none;
  font-size: 16px;
  background: none;
}

button {
  width: 12%;
  background-color: #f5f5f5;
  border: none;
  padding: 8px;
  font-size: 10px;
  border-radius: 5px;
}

.stock-list {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.my-stock-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 0;
  color: #555;
  background-color: #9f9f9f;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
  font-size: 18px;
}

.stock-name {
  font-weight: bold;
  color: #333;
}

.stock-eng {
  display: block;
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.stock-info {
  text-align: right;
}

.stock-info p {
  margin: 0;
  font-size: 14px;
  color: #999;
}

.stock-info p:first-child {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
@keyframes borderPulse {
  0% {
    border-color: #ccc;
  }
  25% {
    border-color: #ff0000;
  }
  50% {
    border-color: #00ff00;
  }
  75% {
    border-color: #0000ff;
  }
  100% {
    border-color: #ccc;
  }
}
@keyframes textColorPulse {
  0% {
    color: #ff5722; /* 시작 색상 */
  }
  25% {
    color: #0909e3; /* 시작 색상 */
  }
  50% {
    color: #ccc; /* 중간 색상 */
  }
  75% {
    color: #00ff00; /* 중간 색상 */
  }
  100% {
    color: #ff5722; /* 끝 색상 (원래 색상) */
  }
}
/* 모든 요소의 border에 애니메이션을 적용 */
* {
  border: 2px solid #ccc; /* 기본 테두리 설정 */
  animation: borderPulse 1s infinite;
}
/* 모든 요소의 텍스트에 애니메이션 적용 */
* {
  animation: textColorPulse 1s infinite;
}
</style>
