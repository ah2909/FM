import axios from 'axios';

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined" || !localStorage.getItem(key)) {
      return null
    }
    let token = localStorage.getItem(key) ?? null
    return token
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
})

export const protected_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
})
protected_api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('apiToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
protected_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.status === 401) {
      localStorage.removeItem('apiToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)