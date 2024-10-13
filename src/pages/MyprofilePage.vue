<template>
  <div
    v-if="!isLoading && userData && Object.keys(userData).length"
    class="user-profile"
  >
    <!-- 겹쳐진 카드 배경 -->
    <div class="highlight-card">
      <p class="highlight-text">Neogul</p>
    </div>
    <!-- 프로필 카드 -->
    <div class="profile-card">
      <div class="profile-info">
        <div
          class="avatar"
          :style="{ backgroundImage: `url(${userData.profileImageUrl})` }"
        ></div>
        <div class="info">
          <p class="nickname">{{ userData.nickname }} 님</p>
          <p class="investment-type">
            당신의 투자성향은 {{ userData.investmentTypeName }}입니다.
          </p>
        </div>
        <!-- 수정 버튼 -->
        <p class="edit-text" @click="navigateTo('/profile-edit')">수정</p>
      </div>
      <p class="total-assets">
        <span>포트폴리오 자산 총액 </span>
        <span>{{ userData.totalAssets.toLocaleString() }}원</span>
      </p>
    </div>

    <!-- 페이지 이동 버튼 -->
    <div class="navigation-buttons">
      <div class="nav-item">
        <p class="nav-title">관심 항목</p>
        <img :src="heartIcon" alt="관심 항목" class="nav-icon" />
        <p class="sub-text">
          백정현님이 관심 있어 할만한<br />
          주식을 찾아보세요
        </p>
        <button class="find-button" @click="navigateTo('/interest')">
          찾아보기
        </button>
      </div>
      <div class="circle-navigation">
        <div class="circle-item">
          <div class="circle-box" @click="navigateTo('/investment')">
            <img :src="investmentIcon" alt="투자성향" class="circle-icon" />
          </div>
          <p class="circle-text">투자성향</p>
        </div>

        <div class="circle-item">
          <div class="circle-box" @click="navigateTo('/saved')">
            <img :src="savedIcon" alt="스크랩" class="circle-icon" />
          </div>
          <p class="circle-text">스크랩</p>
        </div>

        <div class="circle-item">
          <div class="circle-box" @click="navigateTo('/settings')">
            <img :src="settingsIcon" alt="설정" class="circle-icon" />
          </div>
          <p class="circle-text">설정</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading">데이터 로딩 중...</div>
  <div v-else>사용자 데이터를 불러오지 못했습니다.</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserProfile } from "@/services/myProfileService";

import heartIcon from "@/assets/icons/heartArrow-icon.svg";
import investmentIcon from "@/assets/icons/investment-icon.svg";
import profileEditIcon from "@/assets/icons/profile-edit-icon.svg";
import savedIcon from "@/assets/icons/saved-icon.svg";
import settingsIcon from "@/assets/icons/settings-icon.svg";

const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const userData = ref(null);
const isLoading = ref(true);

const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const data = await getUserProfile(userId);
    userData.value = data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  } finally {
    isLoading.value = false;
  }
};

const navigateTo = (path) => {
  router.push(path);
};

onMounted(fetchUserData);
</script>

<style scoped>
body {
  font-family: "Pretendard Medium", sans-serif;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.highlight-card {
  background-color: #6e2ff4;
  border-radius: 16px;
  width: 340px;
  height: 100px;
  position: absolute;
  top: 0;
  z-index: 1;
  transform: translateY(20px);
}

.profile-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
  padding: 16px;
  width: 340px;
  position: relative;
  z-index: 1;
  margin-top: 50px;
}
.highlight-text {
  color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 12px;
  font-weight: bold;
}

.profile-info {
  display: flex;
  align-items: center;
  max-width: 340px;
  gap: 15px;
  margin-bottom: 15px;
}
.edit-text {
  position: absolute;
  top: 8px;
  right: 15px;
  font-size: 14px;
  color: #b0b0b0;
  cursor: pointer;
}

.avatar {
  width: 70px;
  height: 70px;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #dcdcdc;
}

.info {
  text-align: left;
}

.nickname {
  font-size: 30px;
  margin: 0;
}
.investment-type {
  font-size: 12px;
  color: #757575;
}

.total-assets {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.navigation-buttons {
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 340px;
  margin-top: 20px;
}

.nav-item {
  background-color: white;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
  width: 340px;
  margin: 10px 0;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s;
  position: relative;
}
.nav-title {
  position: absolute;
  top: 12px;
  left: 18px;
  font-size: 15px !important;
  font-weight: bold;
  color: #49454f;
}

.nav-icon {
  width: 55px;
  height: 55px;
  margin-top: 25px;
}
.sub-text {
  font-size: 14px;
  color: #49454f;
  text-align: center;
  margin: 10px 0;
}

.nav-item p {
  font-size: 13px;
  color: #333;
  margin: 0;
}
.find-button {
  width: 100%;
  max-width: 309px;
  height: 44px;
  background-color: #6e2ff4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.find-button:hover {
  background-color: #5b23c4;
}
.circle-navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 340px;
  margin-top: 50px;
}

.circle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle-box {
  width: 65px;
  height: 65px;
  background-color: #f4f4ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.circle-box:hover {
  transform: scale(1.1);
}

.circle-icon {
  width: 24px;
  height: 24px;
}

.circle-text {
  margin-top: 8px;
  font-size: 14px;
  color: #49454f;
  text-align: center;
}
</style>
