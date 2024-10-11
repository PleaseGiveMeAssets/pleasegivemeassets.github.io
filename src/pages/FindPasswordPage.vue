<template>
  <div class="find-id-container">
    <!-- 1. 헤더 -->
    <div class="header">
      <h1>아이디 찾기</h1>
    </div>

    <!-- 2. 이름, 휴대폰 번호, 인증번호 입력 영역 -->
    <div class="input-section">
      <!-- 이름 입력 -->
      <div class="input-group">
        <label for="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          v-model="name"
        />
      </div>

      <!-- 휴대폰 번호 입력 -->
      <div class="input-group phone-verification">
        <label for="phone">휴대폰 번호</label>
        <input
          type="text"
          id="phone"
          placeholder="휴대폰 번호 '-' 제외하고 입력"
          v-model="phone"
        />
        <button class="verify-btn" @click="sendVerificationCode">인증</button>
      </div>

      <!-- 인증번호 입력 -->
      <div class="input-group">
        <label for="verificationCode">인증번호</label>
        <input
          type="text"
          id="verificationCode"
          placeholder="인증번호를 입력해주세요."
          v-model="verificationCode"
        />
      </div>
    </div>

    <!-- 3. 다음 버튼 -->
    <div class="next-button-section">
      <button class="next-btn" @click="submitFindId">다음</button>
    </div>

    <!-- 4. 비밀번호 찾기 섹션 -->
    <div class="find-password-section">
      <span>비밀번호를 잊으셨나요?</span>
      <span class="find-password" @click="goToFindPassword">비밀번호 찾기</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      verificationCode: "",
    };
  },
  methods: {
    sendVerificationCode() {
      // 인증번호 전송 로직
      alert("인증번호가 전송되었습니다.");
    },
    submitFindId() {
      // 아이디 찾기 제출 로직
      alert("아이디 찾기 요청을 보냈습니다.");
    },
    goToFindPassword() {
      // 비밀번호 찾기 페이지로 이동
      this.$router.push("/find-password");
    },
  },
};
</script>

<style scoped>
.find-id-container {
  width: 100%;
  max-width: 390px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.input-section {
  width: 100%;
  margin-bottom: 20px;
}

.input-group {
  width: 100%;
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
}

.phone-verification {
  display: flex;
  align-items: center;
}

.phone-verification input {
  flex: 1;
}

.verify-btn {
  padding: 12px;
  background-color: #d8d8d8;
  border: none;
  border-radius: 6px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
}

.next-button-section {
  width: 100%;
}

.next-btn {
  width: 100%;
  padding: 16px;
  background-color: #d8d8d8;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.find-password-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.find-password-section span {
  font-size: 12px;
  color: #000;
}

.find-password {
  margin-left: 5px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
</style>
