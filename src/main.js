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
import axiosConfig from '@/plugins/axiosConfig'

import BaseForm from './components/ui/BaseForm.vue';

const app = createApp(App)
app.config.globalProperties.axios=axiosConfig

app.component('base-form', BaseForm);

registerPlugins(app)
app.use(store)

app.mount('#app')
