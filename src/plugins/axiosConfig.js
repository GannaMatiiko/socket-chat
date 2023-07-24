import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router/index';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_HOST
    // baseURL: 'https://chat-backend-ovl8.onrender.com'
})

instance.interceptors.response.use(response => {
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

export default instance;