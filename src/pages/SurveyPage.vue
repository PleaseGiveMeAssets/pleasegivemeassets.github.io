<template>
  <div class="container mt-5 survey-container">
    <div class="progress mb-4">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progressPercentage + '%' }"
        aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <h1 class="text-center">설문조사</h1>

    <div v-if="question" class="question-container">
      <h2>질문 {{ questionId }}</h2>
      <p>{{ question.content }}</p>

      <div class="options">
        <label>선택지</label>
        <ul class="list-group">
          <li
            v-for="option in question.options"
            :key="option.questionOptionId"
            class="list-group-item"
          >
            <div class="form-check">
              <input
                :id="option.questionOptionId"
                v-model="selectedOption"
                class="form-check-input"
                type="radio"
                :value="option.questionOptionId"
              />
              <label class="form-check-label" :for="option.questionOptionId">{{
                option.content
              }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>질문을 불러오는 중입니다...</p>
    </div>

    <div class="row mt-4">
      <div class="col">
        <button
          :disabled="questionId === 1"
          class="btn btn-secondary w-100"
          @click="prevQuestion"
        >
          이전
        </button>
      </div>
      <div class="col">
        <button
          :disabled="!selectedOption"
          class="btn btn-primary w-100"
          @click="nextQuestion"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchQuestion, submitAnswer } from '../services/surveyService';

// 상태 변수 선언
const question = ref(null);
const questionId = ref(1);
const maxQuestions = 7;
const selectedOption = ref(null); // 선택된 옵션 상태 초기화

// 진행률 계산
const progressPercentage = computed(() => {
  return (questionId.value / maxQuestions) * 100;
});

// 설문 질문 불러오기 함수
const loadQuestion = async () => {
  try {
    question.value = await fetchQuestion(questionId.value);
    selectedOption.value = null; // 질문이 로드될 때마다 선택 옵션 초기화
  } catch (error) {
    console.error('질문을 불러오는 중 오류가 발생했습니다.', error);
  }
};

// 이전 질문으로 이동
const prevQuestion = async () => {
  if (questionId.value > 1) {
    questionId.value--;
    await loadQuestion();
  }
};

// 다음 질문으로 이동 및 답변 제출
const nextQuestion = async () => {
  if (selectedOption.value) {
    const userId = 'testUser1'; // userId 설정
    await submitAnswer(userId, questionId.value, selectedOption.value);

    if (questionId.value < maxQuestions) {
      questionId.value++;
      await loadQuestion();
    } else {
      alert('설문조사가 완료되었습니다!');
    }
  }
};

// 컴포넌트가 마운트될 때 첫 질문을 로드
onMounted(() => {
  loadQuestion();
});
</script>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  background-color: #007bff;
  transition: width 0.4s ease;
}

.question-container {
  margin-bottom: 20px;
}

.options {
  margin-bottom: 20px;
}

.list-group-item {
  border: none;
}

.form-check-input {
  margin-right: 10px;
}

.row {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
}
</style>
