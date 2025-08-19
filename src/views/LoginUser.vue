<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <form
      class="py-6 px-5 min-w-[400px] rounded-2xl flex flex-col gap-2 shadow"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold mb-8">Log into the dashboard</h2>
      <div class="flex gap-2 flex-col">
        <div class="flex flex-col gap-px">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            v-model="formData.username"
            placeholder="Enter your username"
            class="text-gray-800 p-2 outline-none border-1 border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div class="flex flex-col gap-px">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            v-model="formData.password"
            placeholder="Enter your password"
            class="text-gray-800 p-2 outline-none border-1 border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <router-link to="/reset-password" class="text-blue-400 text-[12px] text-end mb-6">
        Forgot Password?
      </router-link>

      <button
        type="submit"
        :disabled="isLoading"
        class="cursor-pointer bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-500"
      >
        <LoadingBubble v-if="isLoading" />
        <span v-else class="text-sm">Login</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import LoadingBubble from '@/components/LoadingBubble.vue'
import { ref } from 'vue'
import { loginUser } from '@/services/api.services'
import { useToast } from 'vue-toastification'

const formData = ref({
  username: '',
  password: '',
})

const toast = useToast()
const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true

    const response = await loginUser(formData.value)

    if (response.status === 'success') {
      toast.success(response.message)
      console.log(response)
      formData.value.username = ''
      formData.value.password = ''
    }
  } catch (error) {
    console.error(error)
    toast.error(error.message || 'An error occurred.')
  } finally {
    isLoading.value = false
  }
}
</script>
