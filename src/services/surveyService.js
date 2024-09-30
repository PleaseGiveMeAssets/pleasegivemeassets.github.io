// src/pages/surveyService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/survey';

export async function fetchQuestion(questionId) {
    const response = await axios.get(`${API_BASE_URL}/question/${questionId}`);
    return response.data;
}

export async function submitAnswer(userId, questionId, optionId) {
    const userAnswerDTO = {
        userId: userId,
        questionId: questionId,
        optionId: optionId,
    };

    await axios.post(`${API_BASE_URL}/answer/${questionId}`, userAnswerDTO);
}
