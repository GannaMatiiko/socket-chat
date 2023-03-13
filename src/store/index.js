import { createStore } from 'vuex';

import chatModule from './modules/chat.js';
import authModule from './modules/auth.js';

const store = createStore({
    modules: {
        chat: chatModule,
        auth: authModule
    },
});

export default store;