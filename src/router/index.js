// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/default/Default.vue';

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
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null
  if (to.name !== 'Login' && !isAuthenticated) {
   next({ name: 'Login' }) 
   return;
  }
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })
    return;
  } 
  else next()
  return;
})

export default router
