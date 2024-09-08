import React from 'react'
import { ChevronUp, ChevronDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from '@/components/navbar'

export default function PortfolioOverview() {
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
            <h2 className="text-4xl font-bold">$1,000,000</h2>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AssetRow asset="Stocks" price={100000} change={3.2} totalValue={100000} />
                <AssetRow asset="Real Estate" price={150000} change={-1.2} totalValue={150000} />
                <AssetRow asset="Cash" price={500000} change={0.1} totalValue={500000} />
                <AssetRow asset="Cryptocurrencies" price={100000} change={5.2} totalValue={100000} />
                <AssetRow asset="Bonds" price={150000} change={-0.2} totalValue={150000} />
              </TableBody>
            </Table>
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

function AssetRow({ asset, price, change, totalValue }: any) {
  const isPositive = change >= 0
  return (
    <TableRow>
      <TableCell>{asset}</TableCell>
      <TableCell>${price.toLocaleString()}</TableCell>
      <TableCell className={isPositive ? 'text-primary' : 'text-destructive'}>
        <div className="flex items-center">
          {isPositive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </TableCell>
      <TableCell>${totalValue.toLocaleString()}</TableCell>
    </TableRow>
  )
}