import { createRouter, createWebHistory } from 'vue-router'

import ResetPassword from '@/views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/LoginUser.vue'),
      name: 'Login Users',
    },

    {
      path: '/reset-password',
      component: ResetPassword,
      name: 'Reset Password',
    },

    {
      path: '/auth/change-password',
      component: () => import('../views/ChangePassword.vue'),
      name: 'Change Password',
    },
  ],
})

export default router
