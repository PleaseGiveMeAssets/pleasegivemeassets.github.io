<template>
  <div class="container mt-5 survey-container">
    <div class="progress mb-4">
      <div class="progress-bar" role="progressbar" :style="{ width: progressPercentage + '%' }" aria-valuenow="progressPercentage" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h1 class="text-center">설문조사</h1>

    <div v-if="question" class="question-container">
      <h2>질문{{ questionId }}</h2>
      <p>{{ question.content }}</p>

      <div class="options">
        <label>선택지</label>
        <ul class="list-group">
          <li v-for="option in question.options" :key="option.questionOptionId" class="list-group-item">
            <div class="form-check">
              <input class="form-check-input" type="radio" :id="option.questionOptionId" :value="option.questionOptionId" v-model="selectedOption" />
              <label class="form-check-label" :for="option.questionOptionId">{{ option.content }}</label>
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
        <button @click="prevQuestion" :disabled="questionId === 1" class="btn btn-secondary w-100">이전</button>
      </div>
      <div class="col">
        <button @click="nextQuestion" :disabled="!selectedOption" class="btn btn-primary w-100">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      question: null,  // 서버에서 받아온 질문과 옵션 저장
      questionId: 1,   // 현재 보여줄 질문의 ID
      maxQuestions: 7, // 총 질문의 개수
      selectedOption: null, // 선택한 옵션 저장
    };
  },
  computed: {
    progressPercentage() {
      return (this.questionId / this.maxQuestions) * 100;
    }
  },
  created() {
    this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/survey/question/${this.questionId}`);
        this.question = response.data;
        this.selectedOption = null; // 다음 질문으로 넘어갈 때 선택한 옵션 초기화
      } catch (error) {
        console.error("질문을 불러오는데 문제가 발생했습니다.", error);
      }
    },
    prevQuestion() {
      if (this.questionId > 1) {
        this.questionId--;
        this.fetchQuestion();  // 이전 질문을 다시 가져오기
      }
    },
    nextQuestion() {
      if (this.questionId < this.maxQuestions) {
        this.questionId++;
        this.fetchQuestion();  // 다음 질문을 다시 가져오기
      }
    }
  }
};
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
