import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import HighchartsVue from "highcharts-vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(HighchartsVue);
app.mount("#app");
