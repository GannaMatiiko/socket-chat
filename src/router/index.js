// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/default/Default.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null
  if (to.name !== 'Login' && !isAuthenticated) {
    console.log('to NOT login');
   next({ name: 'Login' }) 
   return;
  }
  if (to.name === 'Login' && isAuthenticated) {
    console.log('to login');
    next({ name: 'Home' })
    return;
  } 
  else next()
  console.log('in else where next()');
  return;
})

export default router
