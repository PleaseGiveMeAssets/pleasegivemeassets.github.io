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

<script>
import { fetchQuestion, submitAnswer } from "../services/surveyService";

export default {
  data() {
    return {
      question: null,
      questionId: 1,
      maxQuestions: 7,
      selectedOption: null,
    };
  },
  computed: {
    progressPercentage() {
      return (this.questionId / this.maxQuestions) * 100;
    },
  },
  created() {
    this.loadQuestion(); // 설문 질문을 불러옵니다
  },
  methods: {
    async loadQuestion() {
      try {
        this.question = await fetchQuestion(this.questionId);
      } catch (error) {
        console.error("질문을 불러오는 중 오류가 발생했습니다.", error);
      }
    },
    async prevQuestion() {
      if (this.questionId > 1) {
        this.questionId--;
        await this.loadQuestion(); // 이전 질문을 불러옵니다
      }
    },
    async nextQuestion() {
      if (this.selectedOption) {
        const userId = "testUser1"; // userId 설정
        await submitAnswer(userId, this.questionId, this.selectedOption); // 사용자 답변을 제출합니다

        if (this.questionId < this.maxQuestions) {
          this.questionId++;
          await this.loadQuestion(); // 다음 질문을 불러옵니다
        } else {
          alert("설문조사가 완료되었습니다!");
        }
      }
    },
  },
};
</script>

<style scoped>
/* 스타일 코드 여기에... */
</style>

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
