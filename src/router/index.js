import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../pages/LoginUser.vue'),
      name: 'Login Users',
    },
  ],
})

export default router
