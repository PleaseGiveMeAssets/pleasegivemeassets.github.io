<template>
  <div class="card-ui">
    <!-- v-for로 데이터를 반복 렌더링 -->
    <div
      v-for="news in Object.values(data)"
      :key="news.newsId"
      class="news-item"
    >
      <a :href="news.link" target="_blank" class="news-link">
        <span class="news-title">{{ news.title }}</span>
        <img :src="news.image" alt="news image" class="news-image" />
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  display: flex;
  align-items: center;
}

.news-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.news-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.news-title {
  font-size: 16px;
  color: #000;
}
</style>
