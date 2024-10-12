<template>
  <div class="portfolio">
    <h2>포트폴리오</h2>
    <img
      class="next-button"
      src="@/assets/icons/nextButton-icon.svg"
      @click="movePortfolio"
    />
  </div>
  <div class="card-ui">
    <section>
      <div class="home-portfolio">
        <DonutChart :data="stockData" :width="390" :height="350" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import DonutChart from "@/components/DoughnutChart.vue";
import axios from "axios";
import { useRouter } from "vue-router";

// API URL 및 상태 관리
const BASE = `${import.meta.env.VITE_API_URL}/stockportfolio`;
const portfolio = reactive([]);
const stockData = ref([]);
const token = localStorage.getItem("accessToken");
const router = useRouter();

const movePortfolio = () => {
  router.push("/portfolio");
};

// 포트폴리오 데이터 로드 및 차트 초기화
const createPortfolio = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Object.assign(portfolio, response.data);

    stockData.value = portfolio.map((stock) => ({
      name: stock.stockName,
      value: stock.totalPrice,
    }));
  } catch (err) {
    console.error("createPortfolio error:", err.message);

    if (err.response && err.response.status === 500) {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  }
};

// 컴포넌트가 마운트되면 포트폴리오 데이터 생성
onMounted(createPortfolio);
</script>

<style scoped>
.home-portfolio {
  width: 100%;
  height: 300px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 20px;
}

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.portfolio {
  display: flex;
}

.next-button {
  margin-left: auto;
  padding-right: 5px;
  padding-top: 10px;
}
</style>
