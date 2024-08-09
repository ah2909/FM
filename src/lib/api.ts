import { protected_api } from "@/utils/Request";

export const getTransactions = async () => {
    const res = await protected_api.get('/api/transactions')
    if(res.status === 200) return res.data
}