import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAllNews = async () => {
  try {
    const response = await apiClient.get('/news')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (formData) => {
  try {
    const response = await apiClient.post('/auth/login', formData)

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error.message)
  }
}
