<template>
  <div class="find-id-container">
    <!-- 1. 이름 입력창 + 휴대폰번호 입력창 + 인증번호 입력창 -->
    <div class="input-section">
      <!-- 이름 입력창 div -->
      <div class="input-group">
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이름을 입력해주세요."
        />
      </div>

      <!-- 휴대폰번호 입력창 div -->
      <div class="input-group phone-input-group">
        <input
          id="phone"
          v-model="phone"
          type="text"
          placeholder="휴대폰 번호 '-' 제외하고 입력"
        />
        <button
          class="phone-auth-btn"
          :disabled="isPhoneEmpty"
          @click="sendVerificationCode"
        >
          인증
        </button>
      </div>

      <!-- 인증번호 입력창 div -->
      <div class="input-group">
        <input
          id="verificationCode"
          v-model="verificationCode"
          type="text"
          placeholder="인증번호를 입력해주세요."
        />
      </div>
    </div>

    <!-- 2. 다음 버튼 영역 -->
    <div class="next-button-section">
      <!-- 다음 버튼 div -->
      <div>
        <button
          class="next-btn"
          :disabled="isFormInvalid"
          @click="submitFindId"
        >
          다음
        </button>
      </div>
    </div>

    <!-- 3. 비밀번호를 잊으셨나요? + 비밀번호 찾기 -->
    <div class="password-recovery-section">
      <!-- 비밀번호를 잊으셨나요? div -->
      <div class="password-recovery-text">
        <span>비밀번호를 잊으셨나요?</span>
      </div>

      <!-- 비밀번호 찾기 div -->
      <div class="find-password-section">
        <span class="find-password-link" @click="goToFindPassword"
          >비밀번호 찾기</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const phone = ref("");
const verificationCode = ref("");

const router = useRouter();

const isPhoneEmpty = computed(() => phone.value === "");
const isFormInvalid = computed(
  () =>
    name.value === "" || phone.value === "" || verificationCode.value === "",
);

const sendVerificationCode = () => {
  // 여기에 인증번호 전송 로직을 추가하세요.
  alert("인증번호가 전송되었습니다.");
};

const submitFindId = () => {
  // 여기에 아이디 찾기 로직을 추가하세요.
  console.log(
    "아이디 찾기 요청:",
    name.value,
    phone.value,
    verificationCode.value,
  );
};

const goToFindPassword = () => {
  router.push("/find-password");
};
</script>

<style scoped>
.find-id-container {
  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  padding: 80px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
}

.input-section {
  width: 100%;
  margin-bottom: 16px;
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.input-group > input {
  width: 100%;
  padding: 12px;
  font-size: 15px; /* 입력된 텍스트의 크기를 15px로 설정 */
  border: 1px solid var(--input-gray);
  border-radius: 6px;
}

/* placeholder 색상과 기존 크기 유지 */
.input-group > input::placeholder {
  font-size: 13px; /* 기존 크기로 유지 */
  color: var(--input-gray);
}

.phone-input-group {
  display: flex;
  position: relative;
}

.phone-input-group input {
  flex-grow: 1;
  padding-right: 80px; /* 인증 버튼을 위한 여유 공간 */
}

.phone-auth-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: var(--before-auth);
  color: var(--before-auth-text);
  border: none;
  border-radius: 8px !important;
  cursor: pointer;
  width: 88px;
  font-size: 15px;
}

.next-button-section {
  width: 100%;
  margin-bottom: 16px;
}

.next-btn {
  width: 100%;
  height: 42px;
  background-color: #dcd9f7;
  color: #7c77a3;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  line-height: 42px;
}

.next-btn:disabled {
  background-color: #f0f0f0;
}

.password-recovery-section {
  margin-top: 24px;
  text-align: center;
}

.password-recovery-text {
  margin-bottom: 8px;
}

.find-password-section {
  color: #7c77a3;
  cursor: pointer;
}
</style>
