<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "./components/FooterPage.vue";
import Header from "./components/HeaderPage.vue";
</script>

<style lang="scss" scoped></style>
