<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
    >
      <i :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </router-link>
  </nav>
</template>
<script setup>
import { reactive } from "vue";

const menuItems = reactive([
  { name: "홈", path: "/", icon: "fas fa-home" },
  { name: "검색", path: "/search", icon: "fas fa-search" },
  { name: "프로필", path: "/profile", icon: "fas fa-user" },
]);
</script>

<style scoped>
.bottom-nav {
  max-width: 600px;
  position: fixed;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>
