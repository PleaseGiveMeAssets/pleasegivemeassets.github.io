<template>
  <div class="card-ui">
    <p class="title">관련 뉴스</p>

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
.title {
  font-family: "Pretendard-Bold";
  font-size: 18px;
}
.news-link {
  display: flex;
  justify-content: space-between; /* 텍스트와 이미지를 양쪽으로 정렬 */
  align-items: center; /* 텍스트와 이미지를 수직으로 가운데 정렬 */
  text-decoration: none; /* 링크 밑줄 제거 */
}

.news-title {
  flex-grow: 1; /* 제목이 가능한 넓게 차지하도록 설정 */
  font-size: 14px;
  color: #000;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis;
}

.news-image {
  max-width: 100px; /* 이미지의 최대 너비 설정 */
  margin: 10px;
}
.card-ui {
  padding-bottom: 10px;
}
</style>
