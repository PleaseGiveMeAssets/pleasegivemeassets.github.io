import StockPage from "@/pages/StockPage.vue";
import SurveyPage from "@/pages/SurveyPage.vue";
import SurveyLoadingPage from "@/pages/SurveyLoadingPage.vue";
import SurveyResultPage from "@/pages/SurveyResultPage.vue";
import MyprofilePage from "@/pages/MyprofilePage.vue";
import InterestPage from "@/pages/InterestPage.vue";
import NotificationsPage from "@/pages/NotificationsPage.vue";
import ProfileEditPage from "@/pages/ProfileEditPage.vue";
import SavedPage from "@/pages/SavedPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import DailyReportPage from "@/pages/DailyReportPage.vue";
import HomePage from "@/pages/HomePage.vue";
import StockPortfolioPage from "@/pages/StockPortfolio.vue";
import StockSearchPage from "@/pages/StockSearch.vue";
import MyStockListViewPage from "@/pages/MyStockListViewPage.vue";
import AccountManagement from "@/pages/AccountManagement.vue";
import StockPortfolioDetailPage from "@/pages/StockPortfolioDetailPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import FindIdPage from "@/pages/FindIdPage.vue";
import AuthLoginHanddler from "@/components/AuthLoginHandler.vue";
import MainPage from "@/pages/MainPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import RecommendStockPage from "@/pages/RecommendStockPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    {
      path: "/stock/:stockId",
      component: StockPage,
      props: true,
    },
    {
      path: "/stock/:stockId/portfolio",
      component: StockPortfolioDetailPage,
      props: true,
    },
    { path: "/survey", component: SurveyPage }, // Survey 경로 추가
    { path: "/survey-loading", component: SurveyLoadingPage }, // SurveyLoading 경로추가
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

    { path: "/portfolio", component: StockPortfolioPage },
    { path: "/stocksearch", component: StockSearchPage },
    { path: "/myStocklist", component: MyStockListViewPage },
    { path: "/account-management", component: AccountManagement },
    { path: "/recommendstock", component: RecommendStockPage },
    {
      path: "/login",
      component: LoginPage,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next({ path: "/" });
        } else {
          next();
        }
      },
    },
    { path: "/find-id", component: FindIdPage },
    { path: "/auth/login/:service", component: AuthLoginHanddler },
    { path: "/main", component: MainPage, meta: { hideNavbar: true } },
    {
      path: "/auth/logout/kakao",
      component: {
        mounted() {
          this.$router.push("/main");
        },
      },
    },
  ],
});

// 로그인 상태 확인
function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
