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
import { io } from 'socket.io-client';

import BaseForm from './components/ui/BaseForm.vue';

const app = createApp(App)
app.config.globalProperties.$socketio = io(import.meta.env.VITE_VUE_APP_SOCKET_ENDPOINT);

app.component('base-form', BaseForm);

registerPlugins(app)
app.use(store)

app.mount('#app')
