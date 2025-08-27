import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
const toast = useToast()

export const useFetch = (url, options) => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await apiClient.get(url, options)
      if (response.data.status === 'success') {
        toast.success(response.data.message)
      }
      data.value = response.data.data
    } catch (err) {
      error.value = err.message
      toast.error(err.message)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    fetchData,
  }
}
