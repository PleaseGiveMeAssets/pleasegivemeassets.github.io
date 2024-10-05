<template>
  <section class="latest-trend">
    <h2>PGMA(로고)</h2>
    <h3>최신 동향</h3>
    <p>
      어제 금융 시장에서는 미국 연방준비제도(Fed)의 금리 동결 전망과 인플레이션
      완화 기대가 맞물리면서 글로벌 증시가 혼조세를 보였습니다. 미국 국채
      수익률이 하락함에 따라 기술주가 소폭 상승하였으나, 에너지 및 금융주는
      약세를 보였습니다. 또한, 유럽중앙은행(ECB)은 향후 금리 인상을 두고 신중한
      태도를 유지할 것으로 보이며, 이는 유로존 경기 침체 우려를 완화시켰습니다.
    </p>
  </section>

  <section class="stock-trend">
    <h3>종목 동향</h3>
    <p>사용자가 투자한 종목(CONL) 이슈</p>
    <p>
      CONL(Corporation of North Limited)은 최근 전략적 파트너십 확대와 신기술
      도입을 발표하면서 시장의 긍정적인 반응을 이끌어냈습니다. 특히 AI 기반
      자동화 솔루션의 적용으로 운영 효율성을 높일 계획을 밝혀, 기업 수익성
      향상에 대한 기대감이 높아지고 있습니다. 그러나 경쟁사들이 유사한 기술을
      적극적으로 도입하고 있어 향후 시장 경쟁이 치열해질 가능성이 제기되고
      있습니다.
    </p>
  </section>

  <section class="market-index">
    <h2>PGMA(로고)</h2>
    <div class="index-cards">
      <div class="index-card">
        <h4>코스닥</h4>
        <p class="price">$5000</p>
        <p class="change up">+10%</p>
      </div>
      <div class="index-card">
        <h4>코스피</h4>
        <p class="price">100</p>
        <p class="change down">-5%</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

const BASE = "/api/dailytrend";
const trend = reactive([]);
const token = localStorage.getItem("token");

const load = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(trend, response.data);

    console.log("load trend : ", trend);
  } catch (err) {
    console.log("load err : ", err.message);
  }
};
load();
</script>

<style scoped>
.latest-trend,
.stock-trend {
  margin-bottom: 20px;
}

.market-index {
  margin-bottom: 20px;
}

.index-cards {
  display: flex;
  justify-content: space-between;
}

.index-card {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  width: 45%;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.change.up {
  color: green;
}

.change.down {
  color: red;
}
</style>
