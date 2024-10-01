<template>
  <div>
    <h2>Post ID: {{ stockId }}</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});

// store 가져오기
const headerStore = useHeaderStore();

// 타이틀 변경 함수
const changeTitle = (stockId) => {
  headerStore.setTitle(stockId);
};
onMounted(() => {
  changeTitle(props.stockId);
});
</script>
