<template>
  <div class="container">
    <HeaderNavigator />
    <router-view class="content" />
    <BottomNavigator class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import HeaderNavigator from "./components/HeaderNavigator.vue";
import BottomNavigator from "./components/BottomNavigator.vue";
</script>

<style scoped>
.content {
  padding: 48 12 0 12;
}

.container {
  font-family: "Pretendard-Medium";
}

.bottom-nav-bar {
  position: fixed;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
