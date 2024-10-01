<template>
  <div class="container">
    <Header />
    <router-view class="content" />
    <Footer />
    <BottomNavigator class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import Footer from "./components/FooterComponent.vue";
import Header from "./components/HeaderComponent.vue";
import BottomNavigator from "./components/BottomNavigator.vue";
</script>

<style scoped>
.content {
  padding-top: 48px;
}
</style>
