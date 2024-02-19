import { createApp } from 'vue';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/style.css';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
app.use(Toast);
