import StockPage from "@/pages/StockPage.vue";
import SurveyPage from "@/pages/SurveyPage.vue";
import SurveyResultPage from "@/pages/SurveyResultPage.vue";
import MyprofilePage from "@/pages/MyprofilePage.vue";
import InterestPage from "@/pages/InterestPage.vue";
import NotificationsPage from "@/pages/NotificationsPage.vue";
import ProfileEditPage from "@/pages/ProfileEditPage.vue";
import SavedPage from "@/pages/SavedPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import DailyReportPage from "@/pages/DailyReportPage.vue";
import HomePage from "@/pages/HomePage.vue";
import AccountManagement from "@/pages/AccountManagement.vue";
import { createRouter, createWebHistory } from "vue-router";
import RecommendStockPage from "@/pages/RecommendStockPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    {
      path: "/stock/:stockId",
      component: StockPage,
      props: true,
    },
    { path: "/survey", component: SurveyPage }, // Survey 경로 추가
    { path: "/survey-result", component: SurveyResultPage }, // SurveyResult 경로추가
    {
      path: "/myProfile", // MyProfile 경로 추가
      component: MyprofilePage,
      props: true,
    },
    { path: "/interest", component: InterestPage }, // Interest 경로 추가
    { path: "/notifications", component: NotificationsPage }, // Notifications 경로 추가
    { path: "/profile-edit", component: ProfileEditPage }, // ProfileEdit 경로 추가
    { path: "/saved", component: SavedPage }, // Saved 경로 추가
    { path: "/settings", component: SettingsPage }, // Settings 경로 추가
    { path: "/dailyreport", component: DailyReportPage },
    { path: "/account-management", component: AccountManagement },
    { path: "/recommendstock", component: RecommendStockPage },
  ],
});

export default router;
