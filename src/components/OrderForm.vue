<template>
  <div>
    <div class="modal-content" @click="closeTextModal">
      <button class="close-button" @click="emitUpdate">닫기</button>
      <div>
        {{
          data.orderType === "sell"
            ? "매도"
            : data.orderType === "buy"
              ? "매수"
              : "수정"
        }}
      </div>
      <button class="submit-button" type="submit" @click="submitOrderForm">
        <SaveFormIcon />
      </button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="data" class="orderForm">
        <table>
          <tbody>
            <tr>
              <td>
                <div class="stockName">
                  {{ data.stockName }}
                </div>
                <div class="shortCode">
                  {{ data.shortCode }}
                </div>
              </td>

              <td>
                <input
                  v-model="formData.quantity"
                  class="quantityInput"
                  inputmode="numeric"
                  type="number"
                />
                주
              </td>
            </tr>
            <tr>
              <td>평단가</td>
              <td>
                <input
                  v-model="formData.price"
                  class="priceInput"
                  inputmode="numeric"
                  type="number"
                />
                원
              </td>
            </tr>
          </tbody>
        </table>
        <div class="dateTimePicker">
          <input v-model="formData.date" type="date" class="dateInput" />
          <input v-model="formData.time" type="time" class="timeInput" />
        </div>
        <div class="memo" @click="openTextModal" @click.stop>메모 ></div>

        <!-- 모달 창 -->
        <div v-if="isModalVisible" class="modal-overlay">
          <div class="modal-content" @click.stop>
            <textarea
              v-model="formData.memo"
              placeholder="메모를 입력하세요"
              class="memoTextarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import stockPortfolioService from "@/services/stockPortfolioService";
import SaveFormIcon from "@/assets/icons/portfolio-form-save-icon.svg";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const formData = reactive({
  ...props.data,
  date: "",
  time: "",
  memo: "",
});

const emit = defineEmits(["update", "update-data"]);

// update-data 이벤트를 부모에게 알리는 함수
const triggerUpdateData = () => {
  console.log("triggerUpdateData");
  emit("update-data"); // 부모에게 update-data 이벤트 발생
};

const errorMessage = ref("");
let errorTimeout = null;
const emitUpdate = () => {
  console.log("update");

  emit("update", true);
};

const isModalVisible = ref(false);

const showErrorForLimitedTime = () => {
  if (errorTimeout) {
    clearTimeout(errorTimeout); // 이전 타이머를 지웁니다.
  }
  errorTimeout = setTimeout(() => {
    errorMessage.value = ""; // 에러 메시지 사라지게
  }, 3000); // 3초 후 사라짐
};

const openTextModal = () => {
  isModalVisible.value = true;
};

const closeTextModal = () => {
  isModalVisible.value = false;
};

const totalPrice = computed(() => {
  if (!props.data || !props.data.avgPrice || !props.data.quantity) {
    return 0;
  }
  return props.data.avgPrice * props.data.quantity;
});

const validateForm = () => {
  if (formData.quantity <= 0) {
    errorMessage.value = "수량은 0보다 커야 합니다.";
    return false;
  }
  if (formData.price <= 0) {
    errorMessage.value = "가격은 0보다 커야 합니다.";
    return false;
  }
  if (!formData.date) {
    errorMessage.value = "날짜를 입력하세요.";
    return false;
  }
  errorMessage.value = "";
  return true;
};
const convertToTimestamp = async () => {
  const timeValue = formData.time ? formData.time : "00:00";
  const dateTimeString = `${formData.date}T${timeValue}:00`;
  const dateTime = new Date(dateTimeString);
  const timestamp = dateTime.getTime();
  return timestamp;
};

const submitOrderForm = async () => {
  if (!validateForm()) {
    showErrorForLimitedTime();
    return;
  }
  const orderedAt = await convertToTimestamp();
  const orderType = props.data.orderType == "sell" ? "S" : "B";
  try {
    const response = await stockPortfolioService.postStockOrder(
      props.data.stockId,
      {
        quantity: formData.quantity,
        price: formData.price,
        orderType: orderType,
        orderedAt: orderedAt,
        memo: formData.memo,
      },
    );

    // 성공적으로 서버에 데이터 전송 후 처리
    console.log("서버 응답:", response);

    alert("포트폴리오에 저장되었습니다!");
    triggerUpdateData();
    emitUpdate();
  } catch (error) {
    console.error("주문 제출 중 오류 발생:", error);
    alert("제출 중 오류가 발생했습니다.");
  }
};
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
  border-spacing: 30px 30px;
}
.orderInfo {
  padding-left: 16px;
}
td:nth-child(1) {
  text-align: left;
  font-size: 18px;
}
td:nth-child(2) {
  text-align: right;
}
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 110000;
}
.orderForm {
  margin: 40px 10px 0px 0px;
}
.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
.stockName {
  line-height: 1.4;
}
.shortCode {
  line-height: 1.4;
  font-size: 14px;
  color: #9ea6b8;
}
.submit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
}
input {
  border: none;
  outline: none;
  text-align: right;
}
.dateTimePicker {
  margin: 30px 0px 30px 0px;
  display: flex;
}
.quantityInput,
.priceInput {
  width: 120px;
  font-size: 16px;
}
.timeInput,
.dateInput {
  margin: 10px;
  border: 1px #000000 solid;
  border-radius: 10px;
}
.memo {
  float: right;
}
textarea {
  border: none;
}
.error {
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 27%;
  color: #ffffff;
  background-color: #ff4d4f;
  padding: 2px 10px 2px 10px;
  border-radius: 10px;
  margin-top: 40px;
}
</style>
