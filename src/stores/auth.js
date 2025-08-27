import { defineStore } from 'pinia'
// import { ref } from "vue"
import { useLocalStorage } from '@/composables/storage'
import { auth } from '@/services/api.services'

const authStore = defineStore('auth', () => {
  const user = useLocalStorage('user', null)

  const login = async (userData) => {
    const response = await auth.login(userData)
    const { data } = response.data
    user.value = data.token
  }

  return {
    user,
    login,
  }
})

export default authStore
