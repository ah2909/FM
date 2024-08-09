import axios from 'axios';

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined") {
      return "";
    }
    return localStorage.getItem(key);
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
})

export const protected_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
    headers: {'Authorization': 'Bearer ' + getFromLocalStorage('apiToken')},
})
