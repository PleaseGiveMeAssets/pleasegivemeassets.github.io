<template>
  <div class="card-ui portfolio">
    <p class="title">매수 내역</p>
    <table>
      <tbody>
        <div
          v-for="(order, index) in Object.values(data)"
          :key="order.orderId"
          class="orderItem"
        >
          <tr>
            <td>
              <span v-if="!isSameAsPrevious(index)">
                {{ formatDate(order.orderedAt) }}
              </span>
              <span v-else></span>
            </td>
            <td>
              <span
                :class="{
                  sellText: order.orderType !== 'B',
                  buyText: order.orderType === 'B',
                }"
              >
                {{ order.orderType == "B" ? "매수" : "매도" }}
                {{ order.quantity }}주
              </span>
            </td>
            <td>
              {{ (order.price * order.quantity || 0).toLocaleString() }} 원
            </td>
          </tr>
          <tr>
            <td></td>
            <td>{{ (order.price || 0).toLocaleString() }}원</td>
            <td>메모</td>
          </tr>
        </div>
      </tbody>
    </table>
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
};
const isSameAsPrevious = (index) => {
  if (index === 0) return false;
  const previousOrder = Object.values(props.data)[index - 1];
  const currentOrder = Object.values(props.data)[index];
  return (
    formatDate(previousOrder.orderedAt) === formatDate(currentOrder.orderedAt)
  );
};
onMounted(() => {
  console.log(props.data);
});
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
  margin-bottom: 200px;
}
th,
td {
  line-height: 1.6;
}
.totalPrice {
  letter-spacing: -0.3px;
}
.price {
  color: #4f4f4f;
}
td:nth-child(1) {
  width: 50px;
  text-align: left;
}
td:nth-child(2) {
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  padding-right: 70px;
}
td:nth-child(3) {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
.sellText {
  color: var(--bear-color);
}
.orderItem {
  font-size: 14px;
  margin-bottom: 6px;
}
.buyText {
  /* color: var(--bull-color); */
}
</style>
