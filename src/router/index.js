import App from "@/App.vue";
import Example from "@/pages/ExamplePage.vue";
import Home from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/example', component: Example }
    ]
})

export default router