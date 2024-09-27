import App from "@/App.vue";
import Example from "@/pages/Example.vue";
import Home from "@/pages/Home.vue";
import Survey from '../pages/Survey.vue'; // Survey 컴포넌트 추가

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/example', component: Example },
        { path: '/survey', component: Survey },  // Survey 경로 추가
    ]
})

export default router