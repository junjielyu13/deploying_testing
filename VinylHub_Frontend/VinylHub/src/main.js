import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import pinia from '@/pinia.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import setupAuthHeaders from '@/axios.js'

library.add(fas);

axios.defaults.baseURL = "http://localhost:3333";
axios.defaults.params = { clean_key: Date.now() }
axios.interceptors.request.use((config) => {
    config.params.clean_key = Date.now();
    return config;
});

// update auth headers
setupAuthHeaders();

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')


