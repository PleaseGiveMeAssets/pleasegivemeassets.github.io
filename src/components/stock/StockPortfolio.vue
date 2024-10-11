<template>
  <div v-if="data" class="card-ui">
    <div class="portfolio">
      <table>
        <tr>
          <td class="totalPrice">{{ (totalPrice || 0).toLocaleString() }}원</td>
          <td>{{ data.quantity }}주</td>
        </tr>
        <tr>
          <td></td>
          <td class="price">{{ (data.price || 0).toLocaleString() }}원</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const totalPrice = computed(() => {
  if (!props.data || !props.data.price || !props.data.quantity) {
    return 0; // 기본값
  }
  return props.data.price * props.data.quantity;
});
const forceRerender = ref(0);
</script>

<style scoped>
.title {
  font-family: "Pretendard-Bold";
  font-size: 18px;
}
.card-ui {
  font-family: "Pretendard-Bold";
}
table {
  width: 100%;
  border-collapse: collapse;
}
.portfolio {
  padding-right: 24px;
}
th,
td {
  /* border: 1px solid #ddd; */
  line-height: 1.6;
}
.totalPrice {
  letter-spacing: -0.3px;
}
.price {
  color: #4f4f4f;
}
td:nth-child(1) {
  text-align: center;
  padding-right: 70px;
}
td:nth-child(2) {
  text-align: right;
}
</style>
