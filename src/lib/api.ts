import { protected_api } from "@/utils/Request";
import useSWR, { useSWRConfig } from "swr"

const fetcher = async (url: string) => await protected_api.get(url).then((res) => res.data);


export const useTransactions = () => {
    const { data, error, isLoading } = useSWR(`/api/transactions`, fetcher)
    return {
        trans: data,
        isLoading,
        isError: error
    }
}

export const addTransaction = async (data: any) => {
    await protected_api.post('/api/transactions', data)
}

export const useCategory = () => {
    const { data, error, isLoading } = useSWR(`/api/category`, fetcher)
    return {
        category: data,
        isLoading,
        isError: error
    }
}

export const useCategoryByType = (type: string) => {
    const { data, error, isLoading } = useSWR(type !== '' ? `/api/category/${type}` : null, fetcher)
    return {
        category: data,
        isLoading,
        isError: error
    }
}