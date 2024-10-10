<template>
  <div class="empty-asset-box" @click="goToAssetInput">
    <div class="empty-asset-content">
      <span class="empty-asset-icon">+</span>
      <p>자산을 입력해 주세요</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToAssetInput = () => {
  router.push({ path: "/asset-input" }); // 자산 입력 페이지로 이동
};
</script>

<style scoped>
/* 테두리 애니메이션 */
@keyframes borderPulse {
  0% {
    border-color: #ccc;
  }
  25% {
    border-color: #ff0000;
  }
  50% {
    border-color: #00ff00;
  }
  75% {
    border-color: #0000ff;
  }
  100% {
    border-color: #ccc;
  }
}
.empty-asset-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  border: 5px dashed #ccc;
  border-radius: 20px;
  color: #999;
  cursor: pointer;
  margin-top: 50px;

  /* 애니메이션 추가 */
  animation: borderPulse 2s infinite;
}

.empty-asset-content {
  text-align: center;
}

.empty-asset-icon {
  font-size: 36px;
  color: #999;
}
</style>
