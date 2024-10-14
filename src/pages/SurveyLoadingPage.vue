<template>
  <div class="loading-container">
    <div class="loading-text">
      <h2>
        {{ userNickname }}님의 설문 답변을<br />
        바탕으로 투자 유형을<br />
        분석하고 있어요
      </h2>
    </div>
    <div class="loading-dots"><span></span><span></span><span></span></div>
    <div class="raccoon-image">
      <img src="@/assets/images/raccon-loading.png" alt="Raccoon loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchUserNickname } from "../services/surveyService";

const userNickname = ref("");
const router = useRouter();

onMounted(async () => {
  try {
    const nickname = await fetchUserNickname();
    userNickname.value = nickname;
  } catch (error) {
    console.error("유저 닉네임을 불러오는 중 오류가 발생했습니다.", error);
    userNickname.value = "사용자";
  }

  // 일정 시간 후 결과 페이지로 이동
  setTimeout(() => {
    router.push("/survey-result"); // 결과 페이지로 이동
  }, 3000); // 3초 후 이동
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--primary-color);
  color: var(--main-card-color);
  font-family: "Pretendard-Medium", sans-serif;
}

.raccoon-image {
  margin-top: 100px; /* 간격 조정 */
}

.raccoon-image img {
  width: 150px;
  height: auto;
}

.loading-text h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 20px;
  color: var(--main-card-color);
  font-family: "Pretendard-Bold", sans-serif;
}

.loading-dots {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.loading-dots span {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--main-card-color);
  animation: loading 1.2s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
