'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Skeleton } from "./ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useSWRConfig } from 'swr'
import { useCategoryByType, addTransaction } from "@/lib/api"

export default function TransactionDialog() {
    const { toast } = useToast()
    const { mutate } = useSWRConfig()
    const [transactionType, setTransactionType] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);
    const { category, isLoading, isError } = useCategoryByType(transactionType)

    const onSubmit = async (formData: FormData) => {
        let data = Object.fromEntries(formData)
        await addTransaction(data)
        .then(() => {
            setOpen(false)
            toast({
                title: "Add new transaction successfully",
              })
        })
        .catch((err) => {
            toast({
                variant: 'destructive',
                title: err,
              })
        })
        mutate(`/api/transactions`)
        mutate('/api/transactions/statistics')
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add transaction</DialogTitle>
                </DialogHeader>
                <form action={ onSubmit }>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="content" className="text-right">
                                Content
                            </Label>
                            <Input
                                id="content"
                                name="content"
                                placeholder="Some content"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                placeholder="100000"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select name="type" 
                                onValueChange={(e) => {
                                    setTransactionType(e)
                                }}>
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select type of transaction" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                    <SelectItem value="INCOME">Income</SelectItem>
                                    <SelectItem value="EXPENSE">Expense</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {transactionType === 'INCOME' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select name="category">
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Category Income</SelectLabel>
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-auto mx-4 my-2"/>                   
                                    )
                                    : 
                                        category?.data?.map((tmp: any) => (
                                            <SelectItem key={tmp.id} value={tmp.name}>{tmp.name}</SelectItem>
                                        ))
                                    }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        )}
                        {transactionType === 'EXPENSE' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select name="category">
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Category Expense</SelectLabel>
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-auto mx-4 my-2"/>                         
                                    )
                                    : 
                                        category?.data?.map((tmp: any) => (
                                            <SelectItem key={tmp.id} value={tmp.name}>{tmp.name}</SelectItem>
                                        ))
                                    }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        )}
                    </div>
                    <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
  