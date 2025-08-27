import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const auth = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  changePassword: (data) => apiClient.post('/auth/change-password', data),
  requestReset: (data) => apiClient.post('/auth/reset-password-request', data),
  handleReset: (data) => apiClient.patch('/auth/reset-password', data),
}

export const users = {
  getAll: () => apiClient.get('/users'),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (userData) => apiClient.post('/users', userData),
  update: (id, userData) => apiClient.patch(`/users/${id}`, userData),
  remove: (id) => apiClient.delete(`/users/${id}`),
}

export const news = {
  getAll: () => apiClient.get('/news'),
  getById: (id) => apiClient.get(`/news/${id}`),
  create: (newsData) => apiClient.post('/news', newsData),
  update: (id, newsData) => apiClient.patch(`/news/${id}`, newsData),
  remove: (id) => apiClient.delete(`/news/${id}`),
}

export const passwordResetRequests = {
  getAll: () => apiClient.get('/reset-request'),
  getById: (id) => apiClient.get(`/reset-request/${id}`),
}
