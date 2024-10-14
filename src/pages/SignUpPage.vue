<template>
  <div class="signup-container">
    <!-- 이용약관 동의 -->
    <div v-if="step === 1">
      <h2 class="section-title">이용약관</h2>
      <div class="content">
        <!-- 전체 동의 섹션 -->
        <div class="all-terms-agreement">
          <label class="custom-checkbox">
            <input
              v-model="allAgreed"
              type="checkbox"
              @change="toggleAllTerms"
            />
            <span class="checkmark"></span>
            <span class="term-text">이용약관 전체동의</span>
          </label>
        </div>
        <!-- 개별 약관 섹션 -->
        <div class="individual-terms">
          <div v-for="term in terms" :key="term.id" class="term-item">
            <div class="term-wrapper">
              <label class="custom-checkbox">
                <input
                  v-model="term.agreed"
                  type="checkbox"
                  @change="updateAllAgreed"
                />
                <span class="checkmark"></span>
                <span class="term-text">
                  <span v-if="term.required" class="required-text">[필수]</span>
                  {{ term.text }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-container">
        <div class="progress-text">{{ step }}단계 중 {{ currentStep }}단계</div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(step / 6) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- 다음 버튼 영역 -->
      <div class="next-button-section">
        <button
          class="next-btn"
          :class="{ 'next-btn-active': !isFormInvalid }"
          :disabled="isFormInvalid"
          @click="nextStep"
        >
          다음
        </button>
      </div>
    </div>

    <!-- 휴대폰 번호 입력 -->
    <div v-else-if="step === 2">
      <h2 class="section-title">휴대폰 번호</h2>
      <div class="content">
        <input v-model="phoneNumber.first" type="tel" placeholder="010" />
        -
        <input v-model="phoneNumber.middle" type="tel" placeholder="1234" />
        -
        <input v-model="phoneNumber.last" type="tel" placeholder="5678" />
        <input
          v-model="phoneVerificationCode"
          type="text"
          placeholder="인증번호 입력"
        />
        <button @click="verifyPhone">인증하기</button>
      </div>
      <div class="next-btn">
        <button :disabled="!phoneVerified" @click="nextStep">다음</button>
      </div>
    </div>

    <!-- 이름 입력 -->
    <div v-else-if="step === 3">
      <h2 class="section-title">이름</h2>
      <div class="content">
        <input v-model="name" type="text" placeholder="이름 입력" />
      </div>
      <div class="next-btn">
        <button :disabled="!name" @click="nextStep">다음</button>
      </div>
    </div>

    <!-- 아이디 입력 -->
    <div v-else-if="step === 4">
      <h2 class="section-title">아이디</h2>
      <div class="content">
        <input v-model="userId" type="text" placeholder="아이디 입력" />
      </div>
      <div class="next-btn">
        <button :disabled="!userId" @click="nextStep">다음</button>
      </div>
    </div>

    <!-- 비밀번호 입력 -->
    <div v-else-if="step === 5">
      <h2 class="section-title">비밀번호</h2>
      <div class="content">
        <input v-model="password" type="password" placeholder="비밀번호 입력" />
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="비밀번호 확인"
        />
      </div>
      <div class="next-btn">
        <button
          :disabled="
            !password ||
            !passwordConfirmation ||
            password !== passwordConfirmation
          "
          @click="nextStep"
        >
          다음
        </button>
      </div>
    </div>

    <!-- 이메일 입력 -->
    <div v-else-if="step === 6">
      <h2 class="section-title">이메일</h2>
      <div class="content">
        <input v-model="email" type="email" placeholder="이메일 입력" />
        <input
          v-model="emailVerificationCode"
          type="text"
          placeholder="인증번호 입력"
        />
        <button @click="verifyEmail">인증하기</button>
      </div>
      <div class="next-btn">
        <button :disabled="!email || !emailVerified" @click="nextStep">
          가입 완료
        </button>
      </div>
    </div>

    <!-- 회원가입 완료 -->
    <div v-else-if="step === 7">
      <h2 class="section-title">회원가입 완료</h2>
      <div class="content">
        <p>회원가입이 완료되었습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const step = ref(1);
const allAgreed = ref(false);
const terms = ref([
  { id: 1, text: "만 15세 이상입니다.", agreed: false, required: true },
  { id: 2, text: "서비스 이용약관 동의", agreed: false, required: true },
  { id: 3, text: "개인정보 수집 및 이용 동의", agreed: false, required: true },
]);

const isFormInvalid = computed(() => !terms.value.every((term) => term.agreed));

const phoneNumber = ref({
  first: "",
  middle: "",
  last: "",
});
const phoneVerificationCode = ref("");
const phoneVerified = ref(false);
const name = ref("");
const userId = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const email = ref("");
const emailVerificationCode = ref("");
const emailVerified = ref(false);

const allTermsAgreed = computed(() => terms.value.every((term) => term.agreed));
const currentStep = computed(() => Math.min(step.value, 6));

function toggleAllTerms() {
  const newState = allAgreed.value;
  terms.value.forEach((term) => (term.agreed = newState));
}

function updateAllAgreed() {
  allAgreed.value = terms.value.every((term) => term.agreed);
}

async function sendSignupData() {
  const signupData = {
    userId: userId.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    phoneFirst: phoneNumber.value.first,
    phoneMiddle: phoneNumber.value.middle,
    phoneLast: phoneNumber.value.last,
    phoneVerificationCode: phoneVerificationCode.value,
    name: name.value,
    email: email.value,
    emailVerificationCode: emailVerificationCode.value,
    termsAgreementDTOList: terms.value
      .filter((term) => term.agreed)
      .map((term) => ({ termsOfUseId: term.id })),
  };

  try {
    const response = await axios.put("/signup", signupData);
    console.log("Signup successful:", response.data);
    // 성공 처리 로직 (예: 완료 메시지 표시, 로그인 페이지로 리다이렉트 등)
  } catch (error) {
    console.error("Signup failed:", error);
    // 에러 처리 로직 (예: 에러 메시지 표시)
  }
}

async function nextStep() {
  if (!isFormInvalid.value) {
    if (step.value === 6) {
      await sendSignupData();
    }
    step.value++;
  }
}

function verifyPhone() {
  // 실제로는 여기에 휴대폰 인증 로직이 들어갑니다.
  console.log("Phone verification code:", phoneVerificationCode.value);
  // 임시로 인증 성공으로 처리
  phoneVerified.value = true;
}

function verifyEmail() {
  // 실제로는 여기에 이메일 인증 로직이 들어갑니다.
  console.log("Email verification code:", emailVerificationCode.value);
  // 임시로 인증 성공으로 처리
  emailVerified.value = true;
}
</script>

<style scoped>
.signup-container {
  /* max-width: 400px; */
  padding: 32px 0 0 0;
}

.section-title {
  font-family: "Pretendard-Bold";
  font-size: 24px;
  margin-bottom: 24px;
}

.content {
  margin-bottom: 24px;
}

.term-item {
  margin-bottom: 16px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  padding-left: 28px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid var(--input-gray);
  border-radius: 50%;
}

.custom-checkbox:hover input ~ .checkmark {
  background-color: #f8f8f8;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--input-gray);
  border-width: 0 2px 2px 0;
  transform: translate(-10%, -5%) rotate(45deg);
  display: block;
}

.custom-checkbox input:checked ~ .checkmark:after {
  border-color: #fff;
}

.term-text {
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.required-text {
  color: #ff3b30;
  padding-right: 6px;
  display: inline-flex;
  align-items: center;
}

.all-terms-agreement {
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--input-gray);
}

.individual-terms {
  margin-top: 16px;
}

.term-wrapper {
  display: flex;
  align-items: center;
}

input[type="text"],
input[type="tel"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid var(--input-gray);
  border-radius: 6px;
  margin-bottom: 16px;
}

input::placeholder {
  color: var(--input-gray);
}

.next-button-section {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 16px;
}

.next-btn {
  width: 100%;
  height: 60px;
  background-color: #e8e8fc;
  color: var(--inactive-button);
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 60px;
  transition:
    background-color 0.1s,
    color 0.1s;
}

.next-btn-active {
  background-color: var(--primary-color);
  color: #ffffff;
}

.next-btn:disabled {
  background-color: var(--inactive-button);
  color: var(--inactive-button-text);
  cursor: not-allowed;
}

.progress-container {
  padding-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: var(--input-gray);
  border-radius: 5px;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  text-align: right;
  margin-right: 10px;
}
</style>
