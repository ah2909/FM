"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AssetChart({ data }: any) {
  function getTenDaysBefore(): Date[] {
    const dates: Date[] = [];
    const today = new Date();
  
    dates.push(new Date(today));
  
    for (let i = 1; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    return dates;
  }
  const formatData = data.map((tmp: any, index: number) => ({day: getTenDaysBefore()[index], balance: tmp.asset_balance}))
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
          <BarChart accessibilityLayer data={formatData.reverse()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickFormatter={formatXAxis}
              axisLine={true}
            />
            <YAxis dataKey="balance"/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="balance" fill="var(--color-balance)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

