'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from 'lucide-react'
import Navbar from '@/components/navbar'
import { RecentTransactions } from '@/components/RecentTransactions'
import Image from 'next/image'
import AddAccountForm from '@/components/AddBankingAccount'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

type Account = {
  id: string
  bankName: string
  accountType: string
  cardNumber: string
  balance: number
  color: string
}

const initialAccounts: Account[] = [
  { id: '1', bankName: 'Chase', accountType: 'Debit Card', cardNumber: '1111 1111 1111 1111', balance: 2500, color: '#1D55E5' },
  { id: '2', bankName: 'Bank of America', accountType: 'Debit Card', cardNumber: '2222 2222 2222 2222', balance: 10000, color: '#C04D30' },
  { id: '3', bankName: 'Wells Fargo', accountType: 'Debit Card', cardNumber: '3333 3333 3333 3333', balance: 5000, color: '#1E5CA2' },
  { id: '4', bankName: 'Citibank', accountType: 'Debit Card', cardNumber: '4444 4444 4444 4444', balance: 15000, color: '#30C073' },
]

const VisaCard = ({ account }: { account: Account }) => (
  <Card className="text-white" style={{backgroundColor: account.color}}>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold">{account.bankName}</p>
          <p className="text-xs opacity-75">{account.accountType}</p>
        </div>
        <CreditCard className="h-8 w-8" />
      </div>
      <p className="text-xl font-bold mb-4">{account.cardNumber}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs opacity-75">Balance</p>
          <p className="text-lg font-semibold">${account.balance.toFixed(2)}</p>
        </div>
        <Image 
            src="https://th.bing.com/th?id=OIP.DCgfEJDZZDka6j0wAAPFrAHaEK&w=333&h=187&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
            alt="Visa logo" 
            height={30}
            width={50}
        />
      </div>
    </CardContent>
  </Card>
)

export default function BankingPage() {
  const [accounts] = useState<Account[]>(initialAccounts)
  const [trans, setTrans] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const addTran = (newTran: any[]) => {
      setTrans(newTran)
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <div className="flex flex-row-reverse">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-8 mr-8">
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
        <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {accounts.map(account => (
              <VisaCard key={account.id} account={account} />
            ))}
        </div>
        <div className="grid grid-cols-1 p-8">
            <RecentTransactions onAddTran={addTran}/>
        </div>
    </div>
  )
}