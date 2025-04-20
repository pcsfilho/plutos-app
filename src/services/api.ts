import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const api = axios.create({
  baseURL: apiBaseUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

// export default {
//   allUsers: () => `${apiBaseUrl}/users`,
//   user: (id: string) => `${apiBaseUrl}/users/${id}`,
//   users: ({ page, pageSize }: { page: number; pageSize: number }) =>
//     `${apiBaseUrl}/users/?page=${page}&pageSize=${pageSize}`,
//   allProjects: () => `${apiBaseUrl}/projects`,
//   project: (id: string) => `${apiBaseUrl}/projects/${id}`,
//   projects: ({ page, pageSize }: { page: number; pageSize: number }) =>
//     `${apiBaseUrl}/projects/?page=${page}&pageSize=${pageSize}`,
//   avatars: () => `${apiBaseUrl}/avatars`,
// }
