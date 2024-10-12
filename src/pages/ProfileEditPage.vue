<template>
  <div class="profile-edit">
    <h1>{{ nickname }}님의 정보</h1>
    <div class="profile-image-container">
      <img :src="profileImageUrl" alt="Profile Image" class="profile-image" />
      <button class="edit-image-button" @click="triggerFileInput">
        <img
          src="@/assets/icons/image-edit-icon.svg"
          alt="edit icon"
          class="edit-icon"
        />
      </button>
      <!-- 파일 선택을 위한 input 요소 -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleImageUpload"
      />
    </div>
    <div class="form-group">
      <label for="name">이름</label>
      <input id="name" v-model="name" type="text" />
      <button class="clear-button" @click="name = ''">x</button>
    </div>
    <div class="form-group">
      <label for="nickname">사용자 이름</label>
      <input id="nickname" v-model="nickname" type="text" />
      <button class="clear-button" @click="nickname = ''">x</button>
    </div>
    <div class="form-group">
      <label for="birthDate">생년월일</label>
      <input
        id="birthDate"
        ref="birthDateInput"
        v-model="birthDate"
        type="date"
      />
    </div>
    <div class="form-group">
      <label for="phoneNumber">핸드폰 번호</label>
      <input id="phoneNumber" v-model="phoneNumber" type="text" />
      <button class="clear-button" @click="phoneNumber = ''">x</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserProfile } from "@/services/profileEditService";

const userId = 1; // 사용자 ID를 임의로 설정

const name = ref("");
const nickname = ref("");
const birthDate = ref("");
const phoneNumber = ref("");
const profileImageUrl = ref("");
const fileInput = ref(null); // 파일 input에 대한 참조

// 파일 선택 창을 열기 위한 함수
const triggerFileInput = () => {
  fileInput.value.click();
};

// 이미지 업로드 핸들러
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImageUrl.value = e.target.result; // 프로필 이미지 업데이트
    };
    reader.readAsDataURL(file);
  }
};

// 사용자 프로필 데이터를 불러오는 함수
onMounted(async () => {
  const userProfile = await getUserProfile(userId);
  name.value = userProfile.name;
  nickname.value = userProfile.nickname;
  birthDate.value = userProfile.birthDate;
  phoneNumber.value = userProfile.phoneNumber;
  profileImageUrl.value = userProfile.profileImageUrl;
});
</script>

<style scoped>
body {
  font-family: "Pretendard Medium", sans-serif;
}
.profile-edit {
  text-align: center;
  padding-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

.profile-image-container {
  position: relative;
  display: inline-block;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-image-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-icon {
  width: 25px;
  height: 25px;
}

.form-group {
  margin: 10px 10px;
  position: relative;
}

label {
  display: block;
  margin: 15px 0 5px 0;
  text-align: left;
  padding-left: 15px;
}

input {
  width: calc(100% - 5px);
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding-left: 15px;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
