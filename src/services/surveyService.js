// src/services/surveyService.js
import axios from "axios";

// 환경변수에서 API URL 불러오기
const BASE = `${import.meta.env.VITE_API_URL}`;
const token = localStorage.getItem("token");

// 설문 질문 불러오기 함수
export async function fetchQuestion(questionId) {
  const response = await axios.get(`${BASE}/survey/question/${questionId}`);
  return response.data;
}

export async function submitAnswer(questionId, optionId) {
  const userAnswerDTO = {
    questionId: questionId,
    optionId: optionId,
  };
  await axios.post(`${BASE}/survey/answer/${questionId}`, userAnswerDTO, {
    headers: {
      Authorization: `Bearer ${token}`, // Add JWT token here
    },
  });
}

export async function fetchSurveyResult() {
  const response = await axios.get(
    `${BASE}/survey-result/investment-type/details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data; // 총 점수와 투자 유형 정보 반환
}

// 사용자 닉네임 불러오기 함수 (JWT 토큰 필요)
export const fetchUserNickname = async () => {
  try {
    const response = await axios.get(`${BASE}/survey-result/user-nickname`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
