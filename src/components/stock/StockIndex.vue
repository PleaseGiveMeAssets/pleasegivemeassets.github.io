<template>
  <div :key="forceRerender" class="card-ui">
    <p class="title">투자지표</p>
    <div class="indexContainer">
      <div class="indexContainerRow">
        <div class="box">
          <div class="boxIndex">
            <p class="text-63">시가총액</p>
            <p class="text-64">{{ capitalization }}</p>
          </div>
        </div>
        <div class="box">
          <div class="boxIndex">
            <p class="text-67">PER</p>
            <p class="text-68">{{ data.per }}배</p>
          </div>
        </div>
        <div class="box">
          <div class="boxIndex">
            <p class="text-71">PBR</p>
            <p class="text-72">{{ data.pbr }}배</p>
          </div>
        </div>
      </div>
      <div class="indexContainerRow">
        <div class="box">
          <div class="boxIndex">
            <p class="text-76">ROE</p>
            <p class="text-77">{{ data.roe }}배</p>
          </div>
        </div>
        <div class="box">
          <div class="boxIndex">
            <p class="text-80">PSR</p>
            <p class="text-81">{{ data.psr }}배</p>
          </div>
        </div>
        <div class="box">
          <div class="boxIndex">
            <p class="text-84">BPS</p>
            <p class="text-85">{{ data.bps }}배</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loadingStore"; // Pinia 스토어 가져오기
import { computed } from "vue";

const loadingStore = useLoadingStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const capitalization = computed(() => {
  return formatLargeNumber(props.data.marketCapitalization * 60000);
});

function formatLargeNumber(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "조";
  } else if (num >= 1e8) {
    return (num / 1e8).toFixed(0) + "억";
  } else {
    return num;
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
}
.indexContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 0px 0px 16px 0px;
  flex-grow: 0;
  flex-shrink: 1;
}
.indexContainerRow {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 14px;
  flex-grow: 1;
  flex-shrink: 1;
}
.box {
  width: 100px;
  height: 74px;
  border: 1px #000000 solid;
  border-radius: 10px;
}
.boxIndex {
  padding-top: 16px;
  padding-left: 14px;
}
.boxIndex > p {
  background-color: #f8f8f8;
  font-size: 14px;
  margin: 0; /* 기본 margin을 제거 */
  padding: 0; /* padding도 필요하면 제거 */
  line-height: 1.4; /* 줄 간격을 설정 (기본 값은 보통 1.5) */
}
.card-ui {
  font-family: "Pretendard-Bold";
}
</style>
