'use client'

import React from 'react'
import { ChevronUp, ChevronDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from '@/components/navbar'
import { useAssetDetails } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'

export default function PortfolioOverview() {
  const { data, isLoading, isError} = useAssetDetails()
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">Portfolio Overview</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with actual chart component */}
            <div className="h-48 bg-secondary rounded-md mb-4"></div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-8">
          <div>
            {isLoading ? (
              <Skeleton className="h-5 w-auto mt-3" />
            )
            : (
              <h2 className="text-4xl font-bold">${data.total}</h2>
            )}
            
            <p className="text-primary">3.2% today</p>
          </div>
          <div className="space-x-4">
            <Button>Deposit</Button>
            <Button variant="outline">Withdraw</Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AssetBar label="Stocks" value={350000} percentage={35} />
              <AssetBar label="Cryptocurrencies" value={150000} percentage={15} />
              <AssetBar label="Cash" value={500000} percentage={50} />
            </div>
          </CardContent>
        </Card>

        <Card>
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