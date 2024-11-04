"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { LabelList, Line, LineChart, CartesianGrid, XAxis } from "recharts"
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


export const description = "History asset balance"

const chartConfig = {
  balance: {
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AssetChart({ data }: any) {
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
  const formatData = data.map((tmp: any, index: number) => ({day: getTenDaysBefore()[index], balance: tmp.asset_balance}))
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
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={formatData.reverse()}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickFormatter={formatXAxis}
              axisLine={false}
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

