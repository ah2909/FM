import { protected_api } from "@/utils/Request";
import useSWR from "swr"

const fetcher = async (url: string) => await protected_api.get(url)
.then((res) => res.data);



export const useTransactions = () => {
    const { data, error, isLoading } = useSWR(
        '/api/transactions', 
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        trans: data,
        isLoading,
        isError: error
    }
}

export const addTransaction = async (data: any) => {
    await protected_api.post('/api/transactions', data)
    .then(res => res.data)
}

export const useCategory = () => {
    const { data, error, isLoading } = useSWR(
        '/api/category',
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        category: data,
        isLoading,
        isError: error
    }
}

export const useCategoryByType = (type: string) => {
    const { data, error, isLoading } = useSWR(
        type !== '' ? `/api/category/${type}` : null,
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        category: data,
        isLoading,
        isError: error
    }
}

export const useTransactionStatistics = () => {
    const { data, error, isLoading } = useSWR(
        '/api/transactions/statistics', 
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        statistic: data,
        statistic_loading: isLoading,
        statistic_error: error
    }
}