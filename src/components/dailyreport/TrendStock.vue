<template>
  <div class="trend">
    <div class="latest-trend">
      <div class="subject">
        <p>{{ trend.recentTrendTitle }}</p>
        <img src="@/assets/images/raccoon_investmentType3_no_bg.png" />
      </div>
      <div class="card-ui">
        {{ trend.recentTrendContent }}
      </div>
    </div>
    <div class="stock-trend">
      <div class="subject">
        <p>{{ trend.stockTrendTitle }}</p>
        <img src="@/assets/images/raccoon_investmentType_no_bg.png" />
      </div>
      <div class="card-ui">
        {{ trend.stockTrendContent }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const token = localStorage.getItem("accessToken");

const trend = ref([]);

const createTrend = async () => {
  try {
    // 하드 코딩 파트
    if (BASE.indexOf("localhost:8080")) {
      Object.assign(trend.value, {
        recentTrendTitle: "최신 동향",
        recentTrendContent:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nisi unde exercitationem velit animi esse tempora, soluta eligendi eaque molestiae natus commodi, aliquid, totam dolorem quis iure ullam quam dolor.",
        stockTrendTitle: "종목 동향",
        stockTrendContent:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nisi unde exercitationem velit animi esse tempora, soluta eligendi eaque molestiae natus commodi, aliquid, totam dolorem quis iure ullam quam dolor.",
      });

      console.log(trend);

      return;
    }

    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(trend.value, response.data);
  } catch (err) {
    console.log("createTrend err : ", err.message);
  }
};

onMounted(() => {
  createTrend();
});
</script>

<style scoped>
.trend {
  background-color: #fcfbff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.card-ui {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.latest-trend .subject {
  display: flex;
  align-items: center;
  gap: 10px;
}

.latest-trend .subject p {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.latest-trend .subject img {
  width: 38px;
}

.stock-trend {
  margin-top: 20px;
}

.stock-trend .subject {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
}

.stock-trend .subject p {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.stock-trend .subject img {
  width: 38px;
}
</style>
