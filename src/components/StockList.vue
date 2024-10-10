<template>
  <div class="stock-list">
    <StockItem v-for="stock in stocks" :key="stock.stockId" :stock="stock" />
  </div>
</template>

<script>
import StockItem from "@/components/StockItem.vue";

export default {
  name: "StockList",
  components: {
    StockItem,
  },
  props: {
    stocks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.stock-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
