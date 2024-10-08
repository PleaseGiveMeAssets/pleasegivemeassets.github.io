<template>
  <div v-if="data" :key="forceRerender" class="card-ui">
    <p class="title">내 포트폴리오</p>
    <p>Stock Name: {{ data.name }}</p>
    <div>
      <div class="grid-container">
        <div class="left-column">
          {{ totalPrice }}
        </div>
        <div class="right-column">{{ data.quantity }}주</div>
        <div class="delta">왼쪽 항목 2</div>
        <div class="right-column">{{ data.price }}원</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const totalPrice = computed(() => {
  if (!props.data || !props.data.price || !props.data.quantity) {
    return "0원"; // 기본값
  }
  return (props.data.price * props.data.quantity).toLocaleString() + "원";
});
const forceRerender = ref(0);
</script>

<style scoped>
.title {
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 개의 열을 동일한 비율로 */
  gap: 10px; /* 항목 사이 간격 */
  border: none; /* 그리드의 테두리 없앰 */
}

.left-column {
  text-align: left; /* 왼쪽 정렬 */
}
.delta {
  color: red;
}
.right-column {
  text-align: right; /* 오른쪽 정렬 */
}
/* 필요에 따라 스타일 추가 */
</style>
