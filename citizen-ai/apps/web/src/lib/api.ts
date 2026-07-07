import axios, { AxiosError, AxiosResponse } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — handle 401 and token refresh
api.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as any
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken })
          localStorage.setItem('accessToken', data.data.accessToken)
          localStorage.setItem('refreshToken', data.data.refreshToken)
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
          return api(originalRequest)
        } catch {
          localStorage.clear()
          window.location.href = '/auth/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

// Typed API helpers
export const authApi = {
  register: (data: object) => api.post('/auth/register', data),
  login: (data: object) => api.post('/auth/login', data),
  requestOtp: (data: object) => api.post('/auth/otp/request', data),
  verifyOtp: (data: object) => api.post('/auth/otp/verify', data),
  refresh: (token: string) => api.post('/auth/refresh', { refreshToken: token }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

export const complaintsApi = {
  create: (data: object) => api.post('/complaints', data),
  list: (params?: object) => api.get('/complaints', { params }),
  get: (id: string) => api.get(`/complaints/${id}`),
  update: (id: string, data: object) => api.patch(`/complaints/${id}`, data),
  stats: () => api.get('/complaints/stats'),
}

export const servicesApi = {
  list: (params?: object) => api.get('/services', { params }),
  get: (id: string) => api.get(`/services/${id}`),
  search: (q: string) => api.get('/services/search', { params: { q } }),
  checkEligibility: (id: string) => api.post(`/services/${id}/eligibility`),
  categories: () => api.get('/services/categories'),
}

export const aiApi = {
  chat: (conversationId: string, message: string) =>
    api.post(`/ai/chat/${conversationId}`, { message }),
  conversations: () => api.get('/ai/conversations'),
  conversation: (id: string) => api.get(`/ai/conversations/${id}`),
  recommendations: () => api.get('/ai/recommendations'),
  draftComplaint: (description: string, category?: string) =>
    api.post('/ai/draft-complaint', { description, category }),
  simplifyPolicy: (text: string) => api.post('/ai/simplify-policy', { text }),
}

export const notificationsApi = {
  list: (params?: object) => api.get('/notifications', { params }),
  markRead: (id?: string) => id ? api.patch(`/notifications/${id}/read`) : api.patch('/notifications/read-all'),
}

export const usersApi = {
  me: () => api.get('/users/me'),
  updateProfile: (data: object) => api.patch('/users/me', data),
  activity: () => api.get('/users/me/activity'),
  savedServices: () => api.get('/users/me/saved-services'),
  toggleSave: (serviceId: string) => api.post(`/users/me/saved-services/${serviceId}`),
}
