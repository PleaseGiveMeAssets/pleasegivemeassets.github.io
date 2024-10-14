<template>
  <div class="container survey-result-container">
    <!-- mt-5 제거 -->
    <!-- 사용자 투자 유형 분석 결과 -->
    <div v-if="investmentType" class="result-container">
      <h6 class="user-nickname">
        {{ userNickname }}님의 투자 유형 분석을 완료하였습니다!
      </h6>
      <!-- 투자 유형 분석 결과 섹션 -->
      <div class="investment-type-result mt-4">
        <!-- nickname-and-type 문장 이동 -->
        <p class="nickname-and-type">{{ userNickname }}님의 투자 유형은</p>

        <div class="investment-type-header">
          <!-- 투자 유형 ID에 따라 이미지를 동적으로 선택 -->
          <img
            class="type-image"
            :src="getImageByType(investmentType.investmentTypeId)"
            alt="Investment Type Image"
          />
          <div class="investment-type-content">
            <!-- <h3>{{ investmentType.investmentTypeName }}</h3> -->
            <h3 :class="getColorByType(investmentType.investmentTypeId)">
              {{ investmentType.investmentTypeName }}
            </h3>
            <p>{{ investmentType.content }}</p>
          </div>
        </div>
      </div>

      <!-- 투자 전략 제시 섹션 -->
      <div class="investment-strategy mt-4">
        <div class="strategy-header">
          <img class="strategy-icon" src="@/assets/images/key.png" alt="Key" />
          <h4>
            {{ investmentType.investmentTypeName }}에게 필요한 전략을
            알려드릴게요
          </h4>
        </div>

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

      <!-- 버튼 -->
      <div class="submit-button">
        <button class="btn btn-primary" @click="restartSurvey">
          설문 재진행
        </button>
      </div>
    </div>

    <div v-else>
      <p>설문 결과를 불러오는 중입니다...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // router import 추가
import {
  fetchSurveyResult,
  fetchUserNickname,
} from '../services/surveyService';

const router = useRouter();

// 상태 변수 선언
const investmentType = ref(null);
const userNickname = ref(''); // 사용자 이름 초기값을 빈 문자열로 설정

// 투자 유형 ID에 따라 이미지를 동적으로 불러오는 함수
const getImageByType = (investmentTypeId) => {
  switch (investmentTypeId) {
    case 1:
      return new URL(
        '@/assets/images/raccoon_investmentType1.png',
        import.meta.url
      ).href;
    case 2:
      return new URL(
        '@/assets/images/raccoon_investmentType2.png',
        import.meta.url
      ).href;
    case 3:
      return new URL(
        '@/assets/images/raccoon_investmentType3.png',
        import.meta.url
      ).href;
    case 4:
      return new URL(
        '@/assets/images/raccoon_investmentType4.png',
        import.meta.url
      ).href;
    case 5:
      return new URL(
        '@/assets/images/raccoon_investmentType5.png',
        import.meta.url
      ).href;
    default:
      return new URL(
        '@/assets/images/raccoon_investmentType1.png',
        import.meta.url
      ).href;
  }
};

const getColorByType = (investmentTypeId) => {
  switch (investmentTypeId) {
    case 1:
      return 'type-color1';
    case 2:
      return 'type-color2';
    case 3:
      return 'type-color3';
    case 4:
      return 'type-color4';
    case 5:
      return 'type-color5';
    default:
      return '';
  }
};

// 설문 결과 및 사용자 닉네임 불러오기 함수
const loadSurveyResult = async () => {
  try {
    // 설문 결과 불러오기
    const result = await fetchSurveyResult();
    investmentType.value = result;

    // 사용자 닉네임 불러오기
    const nickname = await fetchUserNickname();
    userNickname.value = nickname;
  } catch (error) {
    console.error(
      '설문 결과를 불러오는 중 오류가 발생했습니다.',
      error.response?.data || error.message
    );
  }
};

// 설문 재진행 버튼 클릭 시 호출되는 함수
const restartSurvey = () => {
  // 설문 첫 번째 페이지로 이동
  router.push('/survey');
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
  padding: 10px;
  padding-top: 30px; /* 헤더 아래 여백 줄이기 */
  overflow-y: auto; /* 화면에 내용이 넘칠 경우 스크롤 추가 */
  min-height: 110vh; /* 버튼이 하단에 잘리지 않도록 최소 높이 설정*/
}

.user-nickname {
  text-align: center;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.investment-type-result {
  background-color: #6e2ff4;
  color: white;
  padding: 15px;
  border-radius: 10px;
}

.investment-type-header {
  display: flex;
}

.type-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.investment-type-content {
  flex-grow: 1;
}

.investment-type-content h3 {
  margin: 0;
  font-size: 18px;
}

.investment-type-content p {
  margin-top: 5px;
  font-size: 13px;
}

/* 추가된 텍스트 스타일 */
.nickname-and-type {
  color: white;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 3px;
}

.investment-strategy {
  background-color: #e8e8fc;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.strategy-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.strategy-icon {
  width: 30px;
  height: 30px;
  margin-left: 0px;
  margin-right: 10px;
}

.strategy-header h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.strategy-item {
  margin-bottom: 15px;
}

.strategy-item h4 {
  font-size: 14px;
  font-weight: bold;
  color: #6e2ff4;
}

.strategy-item p {
  margin-top: 5px;
  font-size: 13px;
  color: #4f4f4f;
}

.submit-button {
  text-align: center;
  margin-top: 20px;
}

.btn-primary {
  background-color: #6e2ff4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #5b23d1;
}

/* 유형에 따라 글색 다르게 하기 위함 */
.type-color1 {
  color: #f1f1e1; /* 예시 색상 */
}

.type-color2 {
  color: #b4ecc5; /* 예시 색상 */
}

.type-color3 {
  color: #b4c4ec; /* 예시 색상 */
}

.type-color4 {
  color: #f6f676; /* 예시 색상 */
}

.type-color5 {
  color: #f5a6a6; /* 예시 색상 */
}
</style>
