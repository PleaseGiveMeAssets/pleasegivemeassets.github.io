import { defineStore } from "pinia";

export const useHeaderStore = defineStore("headerStore", {
  state: () => ({
    stockName: "",
    shortCode: "",
  }),
  actions: {
    setStockName(stockName) {
      this.stockName = stockName;
    },
    setShortCode(shortCode) {
      this.shortCode = shortCode;
    },
  },
});
