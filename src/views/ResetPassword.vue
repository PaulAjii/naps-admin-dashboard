<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <form
      class="py-6 px-5 min-w-[400px] rounded-2xl flex flex-col gap-2 shadow"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold mb-8">Send a Password Reset Request</h2>
      <div class="flex gap-2 flex-col mb-4">
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
          <label for="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            required
            v-model="formData.position"
            placeholder="Enter your position"
            class="text-gray-800 p-2 outline-none border-1 border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="cursor-pointer bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-500"
      >
        <LoadingBubble v-if="isLoading" />
        <span v-else class="text-sm">Send Request</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import LoadingBubble from '@/components/LoadingBubble.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'

const formData = ref({
  username: '',
  position: '',
})

const authStore = useAuthStore()
const toast = useToast()
const isLoading = ref(false)
const router = useRouter()

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const message = await authStore.resetPasswordRequest(formData.value)

    toast.success(message)
    formData.value.username = ''
    formData.value.position = ''
    router.push('/login')
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred.')
  } finally {
    isLoading.value = false
  }
}
</script>
