<template>
  <Loading v-if="isLoading" />
  <div v-if="!isLoading" class="container">
    <OrderSummary :data="orderSummaryData" />

    <OrderHistory :data="orderHistoryData" />
    <div
      v-if="isStockButtonVisible == true"
      class="stock-order-button-container"
    >
      <button class="sell-button" @click="showForm('sell')">매도</button>
      <button class="buy-button" @click="showForm('buy')">매수</button>
    </div>
    <OrderForm
      v-if="isFormVisible"
      :data="orderFormData"
      class="modal-overlay"
      @update="isCloseClicked"
      @update-data="updateData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import OrderSummary from "@/components/portfolio/OrderSummary.vue";
import OrderHistory from "@/components/portfolio/OrderHistory.vue";
import OrderForm from "@/components/OrderForm.vue";
import stockPortfolioService from "@/services/stockPortfolioService";
import Loading from "@/components/LoadingComponent.vue";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
const headerStore = useHeaderStore();

const isLoading = ref(true);
const isFormVisible = ref(false);
const formType = ref("");

const isCloseClicked = () => {
  isFormVisible.value = false;
};
const fetchStockName = (stockName) => {
  headerStore.setStockTitle(stockName);
};
const fetchShortCode = (stockId) => {
  headerStore.setStockSubtitle(stockId);
};
const setHeaderButton = () => {
  headerStore.setStockPortfolioHeaderButton(true);
};
const stockPortfolioData = ref({});

const showForm = (type) => {
  formType.value = type;
  isFormVisible.value = true;
  console.log(isFormVisible.value);
};

const orderSummaryData = computed(() => {
  if (
    !stockPortfolioData.value ||
    Object.keys(stockPortfolioData.value).length === 0
  )
    return {};

  return {
    stockName: stockPortfolioData.value.name,
    avgPrice: stockPortfolioData.value.totalPrice,
    quantity: stockPortfolioData.value.totalQuantity,
  };
});
const orderFormData = computed(() => {
  if (formType.value == "sell" || formType.value == "buy")
    return {
      orderType: formType.value,
      stockName: stockPortfolioData.value.name,
      stockId: props.stockId,
      price: 0,
      quantity: 0,
    };
  return {
    orderType: formType.value,
    stockName: stockPortfolioData.value.name,
    shortCode: props.stockId,
    price: stockPortfolioData.value.totalPrice,
    quantity: stockPortfolioData.value.totalQuantity,
  };
});

const orderHistoryData = computed(() => {
  return stockPortfolioData.value.orders || [];
});

const isStockButtonVisible = computed(() => headerStore.isStockButtonVisible);

const fetchStockPortfolioData = async () => {
  return await stockPortfolioService.fetchStockOrder(props.stockId);
};

async function updateData() {
  Object.assign(stockPortfolioData.value, await fetchStockPortfolioData());
}

onMounted(async () => {
  await updateData();
  fetchStockName(stockPortfolioData.value.name);
  fetchShortCode(props.stockId);
  setHeaderButton();
  isLoading.value = false;
});
</script>

<style scoped>
.container {
  font-family: "Pretendard-Bold";
  padding-top: 48px;
}

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.stock-order-button-container {
  position: fixed;
  bottom: 38px;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  background-color: #ffffff;
  justify-content: space-around;
  padding: 30px 0px 0px 20px;
}

.sell-button {
  background-color: var(--sell-button-color);
}

.buy-button {
  background-color: var(--buy-button-color);
}

.sell-button,
.buy-button {
  justify-content: center;
  align-items: center;
  color: white;
  width: 168px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; /* 화면 위에 오도록 z-index 설정 */
}
</style>
