<template>
  <div class="loading-overlay">
    <div class="loading-spinner">
      <!-- 로딩 스피너 또는 로딩 메시지 -->
      Loading...
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
  z-index: 1000;
}

.loading-spinner {
  font-size: 24px;
  color: white;
}
</style>
