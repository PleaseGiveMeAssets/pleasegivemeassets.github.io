<template>
  <div class="category-container" :class="{ active: showCategories }">
    <button class="toggle-button" @click="toggleCategories"></button>
    <p class="category-text">카테고리를 선택해주세요</p>
    <div class="grid-container">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-card"
      >
        <img :src="category.icon" :alt="category.name" />
        <span>{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import techIcon from "@/assets/interest-icons/tech-icon.svg";
import energyIcon from "@/assets/interest-icons/energy-icon.svg";
import financeIcon from "@/assets/interest-icons/finance-icon.svg";
import realEstateIcon from "@/assets/interest-icons/real-estate-icon.svg";
import manufacturingIcon from "@/assets/interest-icons/manufacturing-icon.svg";
import healthcareIcon from "@/assets/interest-icons/healthcare-icon.svg";
import entertainmentIcon from "@/assets/interest-icons/entertainment-icon.svg";
import esgIcon from "@/assets/interest-icons/esg-icon.svg";
import securityIcon from "@/assets/interest-icons/security-icon.svg";

const categories = [
  { name: "기술 및 IT", icon: techIcon },
  { name: "에너지 및 환경", icon: energyIcon },
  { name: "금융 및 투자", icon: financeIcon },
  { name: "부동산 및 건설", icon: realEstateIcon },
  { name: "산업 및 제조", icon: manufacturingIcon },
  { name: "헬스케어 및 바이오", icon: healthcareIcon },
  { name: "엔터테인먼트", icon: entertainmentIcon },
  { name: "ESG", icon: esgIcon },
  { name: "보안 및 결제", icon: securityIcon },
];

const showCategories = ref(false); // 기본적으로 보이도록 설정

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};
</script>

<style scoped>
body {
  font-family: "Pretendard Medium", sans-serif;
}
.category-container {
  position: absolute;
  width: 390px;
  height: 421px;
  left: calc(50% - 390px / 2);
  bottom: 0;
  margin-bottom: 67px;
  background: #e5e5e5;
  border-radius: 30px 30px 0 0;
  transition: transform 0.5s ease-in-out;
  transform: translateY(0); /* 기본적으로 카드가 화면에 보이도록 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-container.active {
  transform: translateY(
    100%
  ); /* active 클래스가 있을 때 카드를 화면 아래로 숨김 */
}

.toggle-button {
  position: absolute;
  top: 0;
  left: calc(50% - 25px);
  width: 50px;
  height: 4px;
  background-color: #333;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  z-index: 2; /* z-index를 높게 설정하여 버튼이 보이도록 */
}

.category-text {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding-left: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;
  padding: 20px;
  padding-top: 0;
}

.category-card {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: default;
}

.category-card img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.category-card span {
  font-size: 13px;
  color: #333;
}
</style>
