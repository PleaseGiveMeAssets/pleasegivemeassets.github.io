<template>
  <div class="loading-overlay">
    <div class="loading-containerList">
      <!-- 로딩 중일 때 보여줄 내용 (로딩 스피너나 메시지) -->
      <img
        src="/public/images/spinNuguri.png"
        alt="loading"
        class="loading-image"
      />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경을 반투명하게 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-image {
  padding-top: 200px;
  width: 200px; /* 원하는 크기로 설정 */
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
