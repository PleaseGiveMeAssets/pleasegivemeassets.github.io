<template>
  <div class="stock-portfolio">
    <div v-if="stocks.length > 0">
      <StockList :stocks="stocks" />
    </div>
    <div v-else>
      <p>보유한 주식이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import StockList from "@/components/StockList.vue";

const stocks = ref([]);

onMounted(() => {
  axios
    .get("/api/stock")
    .then((response) => {
      stocks.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching stock data:", error);
    });
});
</script>

<style scoped>
.stock-portfolio {
  padding-top: 48px;
  padding-right: 8px;
  padding-bottom: 60px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
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
