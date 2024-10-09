<template>
  <header class="header">
    <button v-if="showBackButton" class="back-button" @click="goBack">
      <img src="@/assets/icons/backButton-icon.svg" alt="Back" />
    </button>
    <div v-if="stockName != '' || shortCode != ''" class="header-stock-section">
      <div class="stockRow">
        <div class="stockName">
          {{ stockName }}
        </div>
        <div class="stockShortCode">
          {{ shortCode }}
        </div>
      </div>
    </div>

    <div class="header-actions"></div>
    <button
      v-if="isStockPortfolioPage == true"
      class="stock-edit-icon"
      @click="toggleModal"
    ></button>
  </header>
  <div v-if="isModalVisible" class="modal-overlay" @click="toggleModal">
    <div class="modal-content" @click.stop>
      <button class="modal-button" @click="handleEdit">수정하기</button>
      <button class="modal-button" @click="handleSelectDelete">
        선택 삭제하기
      </button>
      <button class="modal-button" @click="handleDeleteAll">
        모두 삭제하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHeaderStore } from "@/stores/headerStore";

const router = useRouter();
const route = useRoute();

const headerStore = useHeaderStore();

const showBackButton = computed(() => {
  return router.currentRoute.value.name !== "home";
});

const stockName = computed(() => headerStore.stockName);
const shortCode = computed(() => headerStore.shortCode);
const isStockPortfolioPage = computed(() => headerStore.isStockPortfolioPage);
const isModalVisible = ref(false);

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
  headerStore.setStockButtonVisible();
};

const handleEdit = () => {
  console.log("수정하기 클릭됨");
};

const handleSelectDelete = () => {
  console.log("선택 삭제하기 클릭됨");
};

const handleDeleteAll = () => {
  console.log("모두 삭제하기 클릭됨");
};

const goBack = () => router.back();
</script>

<style scoped>
p {
  margin: 0px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  padding: 12px 8px 12px 16px;
  gap: 8px;
  isolation: isolate;
  height: 48px;
  background-color: var(--main-card-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
}

.header-title {
  font-family: "Pretendard", sans-serif;
  font-weight: 500; /* Pretendard medium */
  font-size: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
  padding-bottom: 0; /* 아래 패딩 제거 */
}
.header-stock-section {
  font-family: "Pretendard-Bold", sans-serif;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
  display: flex;
  flex-direction: row;
  padding-bottom: 0; /* 아래 패딩 제거 */
}
.stockName {
  font-size: 16px;
  padding-top: 10px;
  line-height: 15px;
}
.stockShortCode {
  text-align: center;
  color: #9ea6b8;
  font-size: 12px;
}
.header-actions {
  flex: none;
  order: 1;
  flex-grow: 0;
}
.title {
  display: block;
  font-weight: bold;
  font-size: 16px;
  color: black;
}
.stock-edit-icon {
  height: 22px;
  width: 22px;
  position: absolute;
  right: 10%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* 슬라이드 효과가 있는 모달 창 */
.modal-content {
  justify-content: center;
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 450px;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  transition: transform 10s ease-in-out; /* 슬라이드 애니메이션을 더 길게 */
}

.modal-overlay .modal-content {
  transform: translateY(0); /* 모달이 올라오는 애니메이션 */
}
.modal-button {
  width: 100%;
  padding: 14px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #000000;

  margin-bottom: 30px;
}
.modal-content button:nth-child(2) {
  background-color: var(--warning-color);
  color: #ffffff;
}
.modal-content button:nth-child(3) {
  background-color: var(--warning-color);
  color: #ffffff;
}
</style>
