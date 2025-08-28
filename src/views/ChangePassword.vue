<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <form
      class="py-6 px-5 min-w-[400px] rounded-2xl flex flex-col gap-2 shadow"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold mb-8">Reset Your Password</h2>
      <div class="flex gap-2 flex-col">
        <div class="flex flex-col gap-px">
          <label for="o_password">Old Password</label>
          <input
            type="password"
            id="o_password"
            name="o_password"
            required
            v-model="formData.oldPassword"
            placeholder="Enter your old password"
            class="text-gray-800 p-2 outline-none border-1 border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div class="flex flex-col gap-px">
          <label for="n_password">New Password</label>
          <input
            type="password"
            id="n_password"
            name="n_password"
            required
            v-model="formData.newPassword"
            placeholder="Enter your password"
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
        <span v-else class="text-sm">Reset Password</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import LoadingBubble from '@/components/LoadingBubble.vue'
import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import { useToast } from 'vue-toastification'

const formData = ref({
  oldPassword: '',
  newPassword: '',
})

const isLoading = ref(false)
const toast = useToast()

const authStore = useAuthStore()

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const message = await authStore.changePassword(formData.value, authStore.token)
    toast.success(message)

    formData.value.oldPassword = ''
    formData.value.newPassword = ''
  } catch (error) {
    toast.error(error.response?.data?.message)
  } finally {
    isLoading.value = false
  }
}
</script>
