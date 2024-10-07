// src/services/surveyService.js
import axios from "axios";

// 환경변수에서 API URL 불러오기
const BASE = `${import.meta.env.VITE_API_URL}`;

// 설문 질문 불러오기 함수
export async function fetchQuestion(questionId) {
  const response = await axios.get(`${BASE}/survey/question/${questionId}`);
  return response.data;
}

// 설문 답변 제출 함수
export async function submitAnswer(userId, questionId, optionId) {
  const userAnswerDTO = {
    userId: userId,
    questionId: questionId,
    optionId: optionId,
  };
  await axios.post(`${BASE}/survey/answer/${questionId}`, userAnswerDTO);
}

// 최종 점수 가져오기 함수
export async function fetchTotalScore(userId) {
  const response = await axios.get(`${BASE}/survey/total-score/${userId}`);
  return response.data;
}

// 설문 결과 불러오기 함수
export async function fetchSurveyResult(userId) {
  const response = await axios.get(`${BASE}/survey/result/${userId}`);
  return response.data; // 총 점수와 투자 유형 정보 반환
}
