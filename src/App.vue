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
@font-face {
  font-family: "MyCustomFont";
  src: url("@/assets/fonts/Pretendard-Bold.ttf");
  font-weight: normal;
  font-style: normal;
}
body {
  font-family: "Pretendard-Bold", sans-serif;
}
.content {
  padding-top: 48px;
}
.container {
  font-family: "Pretendard-Medium";
}
</style>
