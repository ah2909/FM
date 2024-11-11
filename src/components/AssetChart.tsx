"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { LabelList, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Loader2 } from "lucide-react"


export const description = "History asset balance"

const chartConfig = {
  balance: {
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function getTenDaysBefore(): Date[] {
  const dates: Date[] = []
  const today = new Date()

  dates.push(new Date(today))

  for (let i = 1; i < 10; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date)
  }
  return dates
}

export function AssetChart({ data }: any) {

  if(!data) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />

  const formatData = data?.map((tmp: any, index: number) => ({day: getTenDaysBefore()[index], balance: tmp.asset_balance}))
  const changed = Math.floor((parseInt(formatData[0].balance) - parseInt(formatData[9].balance)) / parseInt(formatData[9].balance) * 100)
  const formatXAxis = (tickItem: Date) => {
    return format(new Date(tickItem), 'MMM d')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Balance</CardTitle>
        <CardDescription>Last 10 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formatData.reverse()}
            margin={{
              right: 20,
              left: 20,
            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              tickFormatter={formatXAxis}
              axisLine={false}
            />
            <YAxis 
             type="number"
             dataKey="balance"
             domain={['dataMin - 50', 'dataMax + 50']} 
             hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" />
              }
            />
            <Line
              dataKey="balance"
              type="natural"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-balance)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {changed >= 0 ? (
          <div className="flex gap-2 font-medium leading-none text-primary">
            Trending up by {changed}% last 10 days <TrendingUp className="h-4 w-4" />
          </div>
        )
        : (
          <div className="flex gap-2 font-medium leading-none text-destructive">
            Trending down by {Math.abs(changed)}% last 10 days <TrendingDown className="h-4 w-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

