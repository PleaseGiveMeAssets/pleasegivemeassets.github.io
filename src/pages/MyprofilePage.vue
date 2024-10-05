<template>
  <!-- 사용자 데이터가 존재하고 로딩이 완료되었을 때 렌더링 -->
  <div
    v-if="!isLoading && userData && Object.keys(userData).length"
    class="user-profile"
  >
    <!-- 프로필 사진과 사용자 정보 -->
    <div class="profile-info">
      <div
        class="avatar"
        :style="{ backgroundImage: `url(${userData.profileImageUrl})` }"
      ></div>
      <div class="info">
        <p class="nickname">
          <span class="nickname-highlight">{{ userData.nickname }}</span> 님
        </p>
        <p class="investment-type">
          당신의 투자성향은 {{ userData.investmentTypeName }} 입니다.
        </p>
      </div>
    </div>
    <img :src="graphIcon" alt="그래프" class="graph-icon" />
    <!-- 자산 총액 -->
    <p class="total-assets">
      포트폴리오 자산 총액: {{ userData.totalAssets.toLocaleString() }} 원
    </p>

    <!-- 페이지 이동 버튼 -->
    <div class="navigation-buttons">
      <div class="nav-item" @click="navigateTo('/interest')">
        <img :src="interestIcon" alt="관심항목" class="nav-icon" />
        <p>관심항목</p>
      </div>
      <div class="nav-item" @click="navigateTo('/investment')">
        <img :src="investmentIcon" alt="투자성향" class="nav-icon" />
        <p>투자성향</p>
      </div>
      <div class="nav-item" @click="navigateTo('/notifications')">
        <img :src="notificationIcon" alt="알림함" class="nav-icon" />
        <p>알림함</p>
      </div>
      <div class="nav-item" @click="navigateTo('/profile-edit')">
        <img :src="profileEditIcon" alt="프로필편집" class="nav-icon" />
        <p>프로필 편집</p>
      </div>
      <div class="nav-item" @click="navigateTo('/saved')">
        <img :src="savedIcon" alt="Saved" class="nav-icon" />
        <p>Saved</p>
      </div>
      <div class="nav-item" @click="navigateTo('/settings')">
        <img :src="settingsIcon" alt="설정" class="nav-icon" />
        <p>설정</p>
      </div>
    </div>
  </div>
  <!-- 데이터 로딩 중 표시 -->
  <div v-else-if="isLoading">데이터 로딩 중...</div>
  <!-- 데이터가 없을 때 표시 -->
  <div v-else>사용자 데이터를 불러오지 못했습니다.</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserProfile } from "@/services/myProfileService";

// 아이콘 파일 import
import interestIcon from "@/assets/icons/interest-icon.svg";
import investmentIcon from "@/assets/icons/investment-icon.svg";
import notificationIcon from "@/assets/icons/notification-icon.svg";
import profileEditIcon from "@/assets/icons/profile-edit-icon.svg";
import savedIcon from "@/assets/icons/saved-icon.svg";
import settingsIcon from "@/assets/icons/settings-icon.svg";
import graphIcon from "@/assets/icons/graph-icon.svg";

const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const userData = ref(null);
const isLoading = ref(true);

// 사용자 프로필 데이터를 가져오는 함수
const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const data = await getUserProfile(userId);
    userData.value = data;
    console.log(userData.value);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  } finally {
    isLoading.value = false;
  }
};

// 페이지 이동 함수
const navigateTo = (path) => {
  router.push(path);
};

onMounted(fetchUserData);
</script>

<style scoped>
p {
  margin: 0px;
  padding: 0px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 20px 20px;
  gap: 20px;
  border-radius: 10px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 83px;
  height: 83px;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #dcdcdc;
  align-self: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.nickname {
  font-size: 30px;
}

.nickname-highlight {
  color: var(--primary-color);
}

.investment-type {
  font-size: 11px;
  color: #666;
}

.total-assets {
  font-size: 16px;
  color: var(--main-text-black);
  margin-top: 20px; /* 자산 총액과 다른 요소 간의 간격을 추가 */
}

.navigation-buttons {
  position: fixed;
  bottom: 120px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  justify-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  padding: 30px 10px;
  cursor: pointer;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
}
.nav-item p {
  font-size: 13px;
}
</style>
