'use client'

import React, { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from '@/components/navbar'
import { useAssetDetails } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetChart } from '@/components/AssetChart'
import { Loader2 } from "lucide-react"

export default function PortfolioOverview() {
  const { data, isLoading, isError} = useAssetDetails()
  const [todayChange, setTodayChange] = useState<number>(0);

  useEffect(() => {
    if(!isLoading)
      setTodayChange(Math.floor((parseInt(data.history[0].asset_balance) - parseInt(data.history[1].asset_balance)) / parseInt(data.history[1].asset_balance) * 100))
  }, [data, isLoading])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Portfolio Overview</h2>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            {isLoading ? (
              <Skeleton className="h-5 w-auto mt-3" />
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
          <div className="space-x-4">
            <Button>Deposit</Button>
            <Button variant="outline">Withdraw</Button>
          </div>
        </div>

        {!isLoading ? (
          <AssetChart data={data.history}/>
        )
        : (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          ) : data?.assets.length == 0 ? (
              <p className="text-center font-semibold">
                  Not have asset yet.
              </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.assets.map(
                (asset: any, index: number) => (
                  <AssetRow key={asset.asset} asset={asset.asset} price={data.prices[index].askPrice} change={data.prices[index].priceChangePercent} quantity={asset.free} />
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

function AssetRow({ asset, price, change, quantity }: any) {
  const isPositive = change >= 0
  function removeTrailingZeros(str: string) {
    if(!str) return;
    str = str.replace(/0+$/, '')
    if(str[str.length - 1] === '.') return str.substring(0, str.length - 1)
    return str
  }
  return (
    <TableRow>
      <TableCell>{asset}</TableCell>
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
  )
}