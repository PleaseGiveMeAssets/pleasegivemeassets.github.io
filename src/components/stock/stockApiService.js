// apiService.js
import axios from "axios";

class ApiService {
  async fetchStockPrice(stockId) {
    if (import.meta.env.VITE_USE_API === "true") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USE_API}/stock/${stockId}`,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockStockPrice();
      }
    } else {
      return this.getMockStockPrice();
    }
  }

  async fetchPortfolioSummary(stockId) {
    if (import.meta.env.VITE_USE_API === "true") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USE_API}/stock/${stockId}/summary`,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockPortfolioSummary();
      }
    } else {
      return this.getMockPortfolioSummary();
    }
  }

  async fetchStockIndex(stockId) {
    if (import.meta.env.VITE_USE_API === "true") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USE_API}/stock/${stockId}/index`,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockStockIndex();
      }
    } else {
      return this.getMockStockIndex();
    }
  }

  getMockStockPrice() {
    return [
      {
        stockHistoryId: "20240920101000",
        price: "10000",
      },
      {
        stockHistoryId: "20240920102000",
        price: "11000",
      },
    ];
  }

  getMockPortfolioSummary() {
    return {
      name: "삼성전자",
      price: 64394,
      quantity: 9091,
    };
  }

  getMockStockIndex() {
    return {
      marketCapitalization: "1조원",
      per: 66700,
      pbr: 66700,
      roe: 66700,
      psr: 66700,
      bps: 66700,
    };
  }
}

export default new ApiService();
