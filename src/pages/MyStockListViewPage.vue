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
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
