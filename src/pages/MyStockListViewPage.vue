<template>
  <div class="stock-portfolio">
    <div v-if="loading" class="loading-containerList">
      <!-- 로딩 중일 때 보여줄 내용 (로딩 스피너나 메시지) -->
      <img
        src="/public/images/spinNuguri.png"
        alt="loading"
        class="loading-image"
      />
    </div>

    <div v-else>
      <div v-if="stocks.length > 0">
        <StockList :stocks="stocks" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import StockList from "@/components/StockList.vue";

const stocks = ref([]);
const loading = ref(true); // 데이터를 불러오는 중인지 여부를 추적하는 변수
onMounted(() => {
  axios
    .get("/api/stock")
    .then((response) => {
      stocks.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching stock data:", error);
    })
    .finally(() => {
      loading.value = false; // 로딩이 완료되면 false로 설정
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
.loading-image {
  padding-top: 200px;
  width: 200px; /* 원하는 크기로 설정 */
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
