<template>
  <loading v-if="isLoading || !Object.keys(portfolioData).length" />
  <div v-if="!isLoading && Object.keys(portfolioData).length">
    <div class="card-ui">
      <p class="title">내 포트폴리오</p>
      <!-- <p>Stock Name: {{ portfolioData.name }}</p> -->
      <div>
        <div class="grid-container">
          <div class="left-column">
            {{ totalPrice }}
          </div>
          <div class="right-column">{{ portfolioData.quantity }}주</div>
          <div class="delta">왼쪽 항목 2</div>
          <div class="right-column">{{ portfolioData.price }}원</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import apiService from "../../services/stockService";
import { useLoadingStore } from "@/stores/loadingStore";
import Loading from "@/components/LoadingComponent.vue";

const loadingStore = useLoadingStore();
const isLoading = loadingStore.isLoading;
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
const portfolioData = ref({});

const fetchPortfolioData = async () => {
  portfolioData.value = await apiService.fetchPortfolioSummary(props.stockId);
};

const totalPrice = computed(() => {
  return (
    (
      portfolioData.value.price * portfolioData.value.quantity
    ).toLocaleString() + "원"
  );
});
onMounted(() => {
  fetchPortfolioData();
});
</script>

<style scoped>
.title {
  font-weight: bold;
}
.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 개의 열을 동일한 비율로 */
  gap: 10px; /* 항목 사이 간격 */
  border: none; /* 그리드의 테두리 없앰 */
}

.left-column {
  text-align: left; /* 왼쪽 정렬 */
}
.delta {
  color: red;
}
.right-column {
  text-align: right; /* 오른쪽 정렬 */
}
/* 필요에 따라 스타일 추가 */
</style>
