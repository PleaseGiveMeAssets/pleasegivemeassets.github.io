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
  padding-top: 48px;
}
</style>
