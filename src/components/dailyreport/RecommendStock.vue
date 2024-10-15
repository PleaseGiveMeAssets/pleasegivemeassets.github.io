<template>
  <div style="padding-bottom: 100px">
    <div class="stock">
      <div class="index-section">
        <div>
          <p class="subject">금융 지표</p>
        </div>
        <div class="index">
          <div class="card-ui">
            <p class="subject">코스피</p>
            <p class="index">
              {{ Number(stockIndex.kospi.index).toLocaleString() }}
            </p>
            <p
              class="fluctuation"
              :class="
                stockIndex.kospi.fluctuation > 0 ? 'font-red' : 'font-blue'
              "
            >
              {{ stockIndex.kospi.fluctuation > 0 ? "+" : ""
              }}{{ stockIndex.kospi.fluctuation.toFixed(2) }}%
            </p>
            <img
              class="index-img"
              :src="
                stockIndex.kospi.fluctuation > 0
                  ? '/src/assets/images/stock-plus.png'
                  : '/src/assets/images/stock-minus.png'
              "
            />
          </div>
          <div class="card-ui">
            <p class="subject">코스닥</p>
            <p class="index">
              {{ Number(stockIndex.kosdaq.index).toLocaleString() }}
            </p>
            <p
              class="fluctuation"
              :class="
                stockIndex.kosdaq.fluctuation > 0 ? 'font-red' : 'font-blue'
              "
            >
              {{ stockIndex.kosdaq.fluctuation > 0 ? "+" : ""
              }}{{ stockIndex.kosdaq.fluctuation.toFixed(2) }}%
            </p>
            <img
              class="index-img"
              :src="
                stockIndex.kosdaq.fluctuation > 0
                  ? '/src/assets/images/stock-plus.png'
                  : '/src/assets/images/stock-minus.png'
              "
            />
          </div>
        </div>
      </div>
      <div class="recommand-section">
        <div>
          <p class="subject">추천 종목</p>
        </div>
        <div class="recommand">
          <div
            v-for="(stock, index) in dailyRecommendStock"
            :key="index"
            class="card-ui"
          >
            <img
              class="medal-img"
              :src="`/src/assets/images/medal-${index}.png`"
            />
            <p class="subject">{{ stock.name }}</p>
            <p
              class="fluctuation"
              :class="stock.fluctuation > 0 ? 'font-red' : 'font-blue'"
            >
              {{ stock.fluctuation > 0 ? "+" : ""
              }}{{ stock.fluctuation.toFixed(2) }}%
            </p>
            <p class="content">{{ stock.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const INDEX_BASE = `${import.meta.env.VITE_API_URL}/dailyindex`;
const RECOMMAND_BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const stockIndex = ref({
  kospi: {
    index: 1234,
    fluctuation: 6.07,
  },
  kosdaq: {
    index: 1234,
    fluctuation: -1.86,
  },
});
const dailyRecommendStock = ref([
  { name: "kb 금융", fluctuation: 6.07, content: "호실적, 밸류업 기대감" },
  {
    name: "유한 양행",
    fluctuation: -1.03,
    content: "FDA 신약 허가 신청",
  },
  {
    name: "필옵틱스",
    fluctuation: 3.05,
    content: "유리 기판 수혜 기대",
  },
]);
const token = localStorage.getItem("accessToken");

const createStockIndex = async () => {
  // 하드 코딩 파트
  if (INDEX_BASE.indexOf("localhost:8080")) return;

  try {
    const response = await axios.get(INDEX_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dailyRecommendStock.value = response.data.slice(0, 3); // 최대 3개의 추천 종목만 표시
  } catch (err) {
    console.log("createRecommendStock err : ", err.message);
  }
};

const createRecommendStock = async () => {
  // 하드 코딩 파트
  if (RECOMMAND_BASE.indexOf("localhost:8080")) return;

  try {
    const response = await axios.get(RECOMMAND_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dailyRecommendStock.value = response.data.slice(0, 3); // 최대 3개의 추천 종목만 표시
  } catch (err) {
    console.log("createRecommendStock err : ", err.message);
  }
};

onMounted(() => {
  createStockIndex();
  createRecommendStock();
});
</script>

<style scoped>
.stock {
  background-color: #fcfbff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.font-red {
  color: #ff5252;
}

.font-blue {
  color: #0a7df3;
}

.index-section .subject {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.index-section .index {
  margin-top: 10px;
  display: flex;
  gap: 14px;
}

.index-section .index div {
  flex-grow: 1;
}

.index-section .index div p {
  font-weight: 700;
  margin-bottom: 0px;
}

.index-section .index .subject {
  font-size: 14px;
}

.index-section .index .index {
  margin-top: 6px;
  font-size: 18px;
}

.index-section .index .fluctuation {
  margin-top: 2px;
  font-size: 12px;
}

.index-section .index .index-img {
  width: 120%;
  margin-left: -10%;
}

/* 추천 파트 시작 */
.recommand-section {
  margin-top: 16px;
}

.recommand-section .subject {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.recommand-section .recommand {
  margin-top: 10px;
  display: flex;
  gap: 12px;
}

.recommand-section .recommand .card-ui {
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
}

.recommand-section .recommand .card-ui p {
  font-weight: 700;
  margin-bottom: 0px;
}

.recommand-section .recommand .medal-img {
  width: 40px;
  margin-left: -8px;
  margin-bottom: 6px;
}

.recommand-section .recommand .subject {
  font-size: 14px;
}

.recommand-section .recommand .fluctuation {
  margin-top: 2px;
  font-size: 12px;
}

.recommand-section .recommand .content {
  margin-top: 6px;
  font-size: 10px;
}
</style>
