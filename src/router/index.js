import App from "@/App.vue";
import Example from "@/pages/ExamplePage.vue";
import Home from "@/pages/HomePage.vue";
import StockPage from "@/pages/StockPage.vue";
import SurveyPage from "@/pages/SurveyPage.vue";
import MyProfilePage from "@/pages/MyProfilePage.vue";
import InterestPage from "@/pages/InterestPage.vue";
import NotificationsPage from "@/pages/NotificationsPage.vue";
import ProfileEditPage from "@/pages/ProfileEditPage.vue";
import SavedPage from "@/pages/SavedPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/example", component: Example },
    {
      path: "/stock/:stockId",
      component: StockPage,
      props: true,
    },
    { path: "/survey", component: SurveyPage }, // Survey 경로 추가
    {
      path: "/myProfile", // MyProfile 경로 추가
      component: MyProfilePage,
      props: true,
    },
    { path: "/interest", component: InterestPage }, // Interest 경로 추가
    { path: "/notifications", component: NotificationsPage }, // Notifications 경로 추가
    { path: "/profile-edit", component: ProfileEditPage }, // ProfileEdit 경로 추가
    { path: "/saved", component: SavedPage }, // Saved 경로 추가
    { path: "/settings", component: SettingsPage }, // Settings 경로 추가
  ],
});

export default router;
