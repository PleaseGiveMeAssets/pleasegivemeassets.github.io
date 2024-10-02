import App from '@/App.vue';
import Example from '@/pages/ExamplePage.vue';
import Home from '@/pages/HomePage.vue';
import StockPage from '@/pages/StockPage.vue';
import SurveyPage from '@/pages/SurveyPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/example', component: Example },
    {
      path: '/stock/:stockId',
      component: StockPage,
      props: true,
    },
    { path: '/survey', component: SurveyPage }, // Survey 경로 추가
  ],
});

export default router;
