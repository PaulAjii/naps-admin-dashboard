import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/storage'
import { auth } from '@/services/api.services'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage('user', null)
  const token = useLocalStorage('token', null)

  const login = async (userData) => {
    const response = await auth.login(userData)
    const { data } = response

    if (data.status === 'error') {
      return Promise.reject(new Error(data.message))
    }

    token.value = data.data.token
    user.value = data.data.user
    return data.message
  }

  const resetPasswordRequest = async (userData) => {
    const response = await auth.passwordResetRequest(userData)
    const { data } = response

    if (data.status === 'error') {
      return Promise.reject(new Error(data.message))
    }

    return data.message
  }

  const changePassword = async (userData, token) => {
    const response = await auth.changePassword(userData, token)
    const { data } = response

    if (data.status === 'error') {
      return Promise.reject(new Error(data.message))
    }

    user.value = data.data.user
    return data.message
  }

  return {
    user,
    token,
    login,
    resetPasswordRequest,
    changePassword,
  }
})

export default useAuthStore
