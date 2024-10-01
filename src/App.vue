<template>
  <div class="container">
    <Header />
    <router-view class="content" />
    <Footer />
    <BottomNavigator class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import Footer from "./components/FooterPage.vue";
import Header from "./components/HeaderPage.vue";
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
