<template>
  <div>
    <Header />
    <router-view />
    <Footer />
    <BottomNavigator />
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
</style>
