'use client'

import React, { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from '@/components/navbar'
import { useAssetDetails, fetcher, useTransactionHistory } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetChart } from '@/components/AssetChart'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function PortfolioOverview() {
  const router = useRouter()
  const { data, isLoading, isError} = useAssetDetails()
  const [todayChange, setTodayChange] = useState<number>(0);
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  
  useEffect(() => {
    if(data?.redirect) {
      setIsRedirecting(true)   
    }
    else if(data?.total) {      
      setTodayChange(Math.floor((parseInt(data.total) - parseInt(data.history[0].asset_balance)) / parseInt(data.history[0].asset_balance) * 100))
    }
  }, [data, router])

  if (isLoading || isRedirecting) {
    return <PortfolioSkeleton url={data?.redirect} isRedirecting={isRedirecting}/>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Binance Overview</h2>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            {isLoading ? (
              <Skeleton className="h-5 w-20 mt-3" />
            )
            : (
              <>
                <h2 className="text-4xl font-bold">${data.total}</h2>
                {todayChange >= 0 ? (
                  <p className="text-primary">{todayChange}% today</p>
                )
                : (
                  <p className="text-destructive">{todayChange}% today</p>
                )}
              </>
            )} 
          </div>
          {/* <div className="space-x-4">
            <Button>Deposit</Button>
            <Button variant="outline">Withdraw</Button>
          </div> */}
        </div>

        {!isLoading ? (
          <AssetChart data={data.history}/>
        )
        : (
          <div>
            <Skeleton className="h-20 w-auto mt-3" />
          </div>
        )}
        
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent>
          {isLoading ? (
              <div>
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
              </div>
          ) : data?.assets?.length == 0 ? (
              <p className="text-center font-semibold">
                  Not have asset yet.
              </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                <TableHead className="text-gray-400 font-medium">Asset</TableHead>
                <TableHead className="text-gray-400 font-medium">Price</TableHead>
                <TableHead className="text-gray-400 font-medium">Change</TableHead>
                <TableHead className="text-gray-400 font-medium">Quantity</TableHead>
                <TableHead className="text-gray-400 font-medium text-right">Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.assets?.map(
                (asset: any, index: number) => (
                  <AssetRow 
                    key={asset.asset} 
                    asset={asset.asset} 
                    price={data.prices[index].askPrice} 
                    change={data.prices[index].priceChangePercent} 
                    quantity={asset.free} 
                    expandedRow={expandedRow} 
                    setExpandedRow={setExpandedRow}
                  />
                ))
              }
              </TableBody>
            </Table>
          )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function AssetBar({ label, value, percentage }: any) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-sm text-muted-foreground mt-1">${value.toLocaleString()}</div>
    </div>
  )
}

function AssetRow({ asset, price, change, quantity, expandedRow, setExpandedRow }: any) {
  const { data, isLoading, isError} = useTransactionHistory(asset+'USDT', expandedRow)
  const isPositive = change >= 0

  function removeTrailingZeros(str: string) {
    if(!str) return;
    str = str.replace(/0+$/, '')
    if(str[str.length - 1] === '.') return str.substring(0, str.length - 1)
    return str
  }
  const toggleRow = (symbol: string) => {
    setExpandedRow(expandedRow === symbol ? null : symbol)
  }

  function formatDate(isoDate: string) {
		const date = new Date(isoDate);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		// const hours = date.getHours().toString().padStart(2, "0");
		// const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${day}/${month}/${year}`;
	}

  return (
    <>
    <TableRow
      className="cursor-pointer border-b border-gray-800 hover:bg-gray-900/50"
      onClick={() => toggleRow(asset+'USDT')}
    >
      <TableCell className="font-medium flex items-center gap-2">
      {expandedRow === asset+'USDT' ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
        {asset}
      </TableCell>
      <TableCell>${removeTrailingZeros(price) || 0}</TableCell>
      { change ?
      <TableCell className={isPositive ? 'text-primary' : 'text-destructive'}>
        <div className="flex items-center">
          {isPositive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </TableCell>
      :
      <TableCell>Unknown</TableCell>
      }
      <TableCell>{removeTrailingZeros(quantity)}</TableCell>
      <TableCell>${Math.ceil(quantity * price) || 0}</TableCell>
    </TableRow>
    {isLoading ? (
      <div>
        <Skeleton className="h-5 w-auto mt-3" />
        <Skeleton className="h-5 w-auto mt-3" />
        <Skeleton className="h-5 w-auto mt-3" />
        <Skeleton className="h-5 w-auto mt-3" />
      </div>
    ) : expandedRow === asset+'USDT' && (
      <TableRow>
        {data.data.msg === "Invalid symbol." ? (
          <TableCell colSpan={5} className="p-4">Do not have any transactions.</TableCell>
        ) :
        <TableCell colSpan={5} className="p-4">
          <div className="text-sm font-medium mb-2">Transaction History</div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">Date</TableHead>
                <TableHead className="text-gray-400 font-medium">Type</TableHead>
                <TableHead className="text-gray-400 font-medium">Amount</TableHead>
                <TableHead className="text-gray-400 font-medium">Price</TableHead>
                <TableHead className="text-gray-400 font-medium text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {data.data.map((tx: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{formatDate(tx.time)}</TableCell>
                <TableCell className={tx.side === "BUY" ? 'text-primary' : 'text-destructive'}>
                  {tx.side}
                </TableCell>
                <TableCell>{removeTrailingZeros(tx.executedQty)}</TableCell>
                <TableCell>${removeTrailingZeros(tx.price)}</TableCell>
                <TableCell className="text-right">
                  ${(tx.executedQty * tx.price).toFixed(2)}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
        }
      </TableRow>      
    )}
    </>
  )
}

function PortfolioSkeleton({ url, isRedirecting }: any) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Portfolio Overview</h2>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-5 w-20 mt-3" />
          </div>
        </div>

        <div>
          <Skeleton className="h-20 w-auto mt-3" />
        </div>
        
        
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
                <Skeleton className="h-5 w-auto mt-3" />
                <Skeleton className="h-5 w-auto mt-3" />
                <Skeleton className="h-5 w-auto mt-3" />
                <Skeleton className="h-5 w-auto mt-3" />
            </div>
          </CardContent>
        </Card>
      </main>
      <Dialog open={isRedirecting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redirecting</DialogTitle>
            <DialogDescription>
              You need to provide Binance key to use this page. You can add in redirected page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => router.push(url)}>
              Redirect Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}