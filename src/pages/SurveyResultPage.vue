<template>
  <div class="container mt-5 survey-result-container">
    <h1 class="text-center">투자유형 분석</h1>

    <div v-if="investmentType" class="result-container">
      <h2>{{ userName }}님의 투자 유형 분석을 완료하였습니다.</h2>

      <div class="investment-type-result mt-4">
        <h3>투자 유형 분석 결과</h3>
        <p>
          <strong>{{ investmentType.investmentTypeName }}</strong>
        </p>
        <p>{{ investmentType.content }}</p>
      </div>

      <div class="investment-strategy mt-4">
        <h3>투자 전략 제시</h3>
        <div class="strategy-item">
          <h4>주식 배분</h4>
          <p>{{ investmentType.stockAllocationContent }}</p>
        </div>
        <div class="strategy-item">
          <h4>종목 선택</h4>
          <p>{{ investmentType.stockSelectionContent }}</p>
        </div>
        <div class="strategy-item">
          <h4>리스크 관리</h4>
          <p>{{ investmentType.riskManagementContent }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>설문 결과를 불러오는 중입니다...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchSurveyResult } from "../services/surveyService";

// 상태 변수 선언
const investmentType = ref(null);
const userName = ref("홍길동"); // 실제 사용자 이름을 사용할 수 있도록 수정

// 설문 결과 불러오기 함수
const loadSurveyResult = async () => {
  try {
    const result = await fetchSurveyResult();
    investmentType.value = result;
  } catch (error) {
    console.error(
      "설문 결과를 불러오는 중 오류가 발생했습니다.",
      error.response?.data || error.message,
    );
  }
};

// 컴포넌트가 마운트될 때 설문 결과를 로드
onMounted(() => {
  loadSurveyResult();
});
</script>

<style scoped>
.survey-result-container {
  max-width: 600px;
  margin: 0 auto;
}

.investment-type-result,
.investment-strategy {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.strategy-item {
  margin-bottom: 15px;
}
</style>
