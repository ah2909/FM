'use client'

import { CreditCard } from 'lucide-react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import AddAccountForm from '@/components/AddAPIKey'
import { useAssetDetails } from '@/lib/api'
import { useState, useEffect } from 'react'
import { PlusCircle, Trash2, ExternalLink, Copy, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Account = {
  id: string
  name: string
  type: 'Binance' | 'OKX' | 'Coinbase'                                
  apiKey: string
  balance: number
}

export default function BankingPage() {
  const [open, setOpen] = useState(false)
  const { data, isLoading, isError} = useAssetDetails()
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'My Binance', type: 'Binance', apiKey: 'xxxxxxxxxxxxxxxx', balance: 1234.56 },
    { id: '2', name: 'OKX Trading', type: 'OKX', apiKey: 'yyyyyyyyyyyyyyyy', balance: 789.01 },
  ])

  const [newAccount, setNewAccount] = useState<Partial<Account>>({})
  const addAccount = () => {
    if (newAccount.name && newAccount.type && newAccount.apiKey) {
      setAccounts([...accounts, { ...newAccount, id: Date.now().toString(), balance: 0 } as Account])
      setNewAccount({})
    }
  }

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id))
  }

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey)
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col gap-4">
      <Navbar />
      <div className="flex flex-row-reverse">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mr-4 lg:mt-8 lg:mr-8">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Banking Account</DialogTitle>
              <DialogDescription>
                Enter the details of the new banking account. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <AddAccountForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
        {accounts.map((account, index) => (
          <Card key={account.id} className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {account.name}
                <Button variant="ghost" size="icon" onClick={() => removeAccount(account.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove account</span>
                </Button>
              </CardTitle>
              <CardDescription>{account.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">API Key:</span>
                <div className="flex items-center">
                  <span className="mr-2">{account.apiKey.slice(0, 4)}...{account.apiKey.slice(-4)}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyApiKey(account.apiKey)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy API key</span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Balance:</span>
                <span>${account.balance.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open {account.type}
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-full min-h-[200px] flex flex-col items-center justify-center bg-card hover:bg-accent">
              <PlusCircle className="h-6 w-6 mb-2" />
              Add New Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle>Add New Crypto Account</DialogTitle>
              <DialogDescription>
                Connect a new cryptocurrency exchange account to manage your assets.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newAccount.name || ''}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => setNewAccount({ ...newAccount, type: value as Account['type'] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Binance">Binance</SelectItem>
                    <SelectItem value="OKX">OKX</SelectItem>
                    <SelectItem value="Coinbase">Coinbase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  value={newAccount.apiKey || ''}
                  onChange={(e) => setNewAccount({ ...newAccount, apiKey: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addAccount}>Add Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}