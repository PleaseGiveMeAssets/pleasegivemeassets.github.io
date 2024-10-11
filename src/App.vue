<template>
  <div class="container">
    <HeaderNavigator v-if="!$route.meta.hideNavbar" />
    <div :class="{ content: !$route.meta.hideNavbar }">
      <router-view />
    </div>
    <BottomNavigator v-if="!$route.meta.hideNavbar" class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import HeaderNavigator from "./components/HeaderNavigator.vue";
import BottomNavigator from "./components/BottomNavigator.vue";

const route = useRoute();
</script>

<style scoped>
.content {
  padding: 48px 16px 0px 16px;
}

.container {
  font-family: "Pretendard-Medium";
  padding: 0px;
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
