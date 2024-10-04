<template>
  <div class="container">
    <HeaderNavigator />
    <router-view class="content" />
    <Footer />
    <BottomNavigator class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import HeaderNavigator from "./components/HeaderNavigator.vue";
import BottomNavigator from "./components/BottomNavigator.vue";
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
}

.content {
  padding-top: 60px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
