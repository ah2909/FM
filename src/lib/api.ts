import { protected_api } from "@/utils/Request";
import axios from "axios";
import useSWR from "swr"

export const fetcher = async (url: string) => await protected_api.get(url)
.then((res) => res.data);


export const useTransactions = (page: number) => {
    const { data, error, isLoading } = useSWR(
        `/api/transactions?page=${page}`, 
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

export const addKey = async (data: any) => {
    await protected_api.post('/api/binance-key', data)
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

export const calculateStatistics = async (data: any) => {
    const res = await protected_api.post('/api/transactions/statistics', data)
    return res.data
}

export const searchAsset = async (q: string) => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search', {
        params: {query: q},
        headers: {
            accept: 'application/json', 
            'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY
        }
    })
    return res.data
}

export const useBinanceKey = () => {
    const { data, error, isLoading } = useSWR(
        '/api/binance-key', 
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        key: data,
        isLoading,
        isError: error
    }
}

export const useAssetDetails = () => {
    const { data, error, isLoading } = useSWR(
        '/api/binance-key/assets', 
        fetcher,
        { 
            revalidateOnFocus: false,
            refreshInterval: 0,
        }
    )
    return {
        data: data,
        isLoading,
        isError: error
    }
}

export const useTransactionHistory = (symbol: any, flag: any)=> {
    const { data, error, isLoading } = useSWR(
        flag === symbol ?
        `/api/binance-key/transactions?symbol=${symbol}` : null, 
        fetcher,
        { revalidateOnFocus: false, }
    )
    return {
        data: data,
        isLoading,
        isError: error
    }
}