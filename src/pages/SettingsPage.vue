<template>
  <div class="settings-page">
    <div class="section">
      <h2>계정 관리</h2>
      <router-link to="/account-management" class="item">
        <span>개인정보 변경</span>
        <span>></span>
      </router-link>
      <div class="item">
        <span>자동 로그인 사용</span>
        <ToggleSwitch />
      </div>
      <div class="item">
        <span>로그아웃</span>
      </div>
    </div>

    <hr />

    <div class="section">
      <h2>화면 설정</h2>
      <div class="item">
        <span>초기화면 설정</span>
        <span>홈 ></span>
      </div>
      <div class="item">
        <span>다크 모드 설정</span>
        <ToggleSwitch />
      </div>
    </div>

    <hr />

    <div class="section">
      <h2>정보</h2>
      <div class="item">
        <span>이용 약관</span>
        <span>></span>
      </div>
      <div class="item">
        <span>개인정보 처리방침</span>
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from "@/components/ToggleSwitch.vue";

export default {
  name: "SettingsPage",
  components: {
    ToggleSwitch,
  },
};
</script>

<style scoped>
.settings-page {
  padding: 16px;
  padding-top: 80px;
  background-color: #fff;
}

.section {
  margin-bottom: 16px;
}

h2 {
  font-size: 16px;
  font-family: bold;
  margin-bottom: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

hr {
  border: none;
  border-top: 1px solid #bbb;
  margin: 16px 0;
}
</style>
