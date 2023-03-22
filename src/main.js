/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store/index.js';
import router from './router/index.js';
// import { io } from 'socket.io-client';
import axios from 'axios'

import BaseForm from './components/ui/BaseForm.vue';

const app = createApp(App)
// app.config.globalProperties.$socketio = io(import.meta.env.VITE_VUE_APP_SOCKET_ENDPOINT);
app.config.globalProperties.axios=axios

// TODO transfer to external file
axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    //place your reentry code
    console.log('401 Occured!');
    router.replace('/login');
    store.dispatch('logoutUser')
   }
   return error;
 });

app.component('base-form', BaseForm);

registerPlugins(app)
app.use(store)

app.mount('#app')
