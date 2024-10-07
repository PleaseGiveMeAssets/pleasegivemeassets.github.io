<template>
  <div class="container mt-5 survey-result-container">
    <h1 class="text-center">설문 결과</h1>

    <div v-if="loading" class="text-center">
      <p>결과를 불러오는 중입니다...</p>
    </div>
    <div v-else-if="error" class="text-center">
      <p>{{ error }}</p>
    </div>
    <div v-else class="text-center">
      <h2>{{ investmentType.investmentTypeName }} ({{ totalScore }}점)</h2>
      <p>{{ investmentType.content }}</p>

      <h3>주식 배분 전략</h3>
      <p>{{ investmentType.stockAllocationContent }}</p>

      <h3>주식 선택 전략</h3>
      <p>{{ investmentType.stockSelectionContent }}</p>

      <h3>위험 관리 전략</h3>
      <p>{{ investmentType.riskManagementContent }}</p>

      <button class="btn btn-primary mt-3" @click="goHome">
        홈으로 돌아가기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchSurveyResult } from "../services/surveyService";

// 상태 변수 선언
const totalScore = ref(null);
const investmentType = ref({});
const loading = ref(true);
const error = ref(null);
const router = useRouter();

// 결과 불러오기 함수
const loadSurveyResult = async () => {
  try {
    const userId = "testUser1"; // 실제 유저 아이디 사용
    const result = await fetchSurveyResult(userId); // API 호출
    totalScore.value = result.totalScore;
    investmentType.value = result.investmentType;
  } catch (err) {
    error.value = "결과를 불러오는 중 오류가 발생했습니다.";
  } finally {
    loading.value = false;
  }
};

// 홈으로 이동
const goHome = () => {
  router.push("/");
};

// 컴포넌트가 마운트될 때 설문 결과를 로드
onMounted(() => {
  loadSurveyResult();
});
</script>

<style scoped>
.survey-result-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.btn {
  padding: 10px 20px;
}
</style>
