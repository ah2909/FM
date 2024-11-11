"use client";

import {
	Activity,
	ArrowUpRight,
	CircleUser,
	CreditCard,
	DollarSign,
	Menu,
	Package2,
	Search,
	Users,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangePicker from "@/components/DateRangePicker"
import { calculateStatistics } from "@/lib/api";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";
import { RecentTransactions } from "@/components/RecentTransactions";

export default function Dashboard() {
  const now = new Date()
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: addDays(new Date(now.getFullYear(), now.getMonth(), 1), 30),
	});
	const [data, setData] = useState<any>({});
	const [trans, setTrans] = useState<any[]>([])

	const addTran = (newTran: any[]) => {
		setTrans(newTran)
	}
	

	useEffect(() => {
		const getData = async () => {
			await calculateStatistics(dateRange)
				.then((res) => {
					setData(res);
				})
				.catch((err) => console.log(err));
		};
		getData();
	}, [trans, dateRange]);

	const handleDateRangeChange = async (newDateRange: DateRange | undefined) => {
		setDateRange(newDateRange);
	};

	function formatAmount(amount: string) {
		let number = parseInt(amount, 10);
		let formattedNumber = number.toLocaleString("vi-VN");

		return `${formattedNumber} VNĐ`;
	}
	return (
		<div className="flex min-h-screen w-full flex-col gap-4 px-4">
			<Navbar />
			<div className="flex flex-row-reverse px-6">
				<DateRangePicker
					onDateRangeChange={handleDateRangeChange}
				/>
			</div>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 px-6">
				<Card x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Balance
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{Object.keys(data).length === 0 ? (
							<div>
								<Skeleton className="h-5 w-20 my-1" />
							</div>
						) : (
							<div className="text-2xl font-bold">
								{formatAmount(data?.balance)}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-1">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Expense
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{Object.keys(data).length === 0 ? (
							<div>
								<Skeleton className="h-5 w-20 my-1" />
							</div>
						) : (
							<div className="text-2xl font-bold">
								{formatAmount(data?.expense)}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Income
						</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{Object.keys(data).length === 0 ? (
							<div>
								<Skeleton className="h-5 w-20 my-1" />
							</div>
						) : (
							<div className="text-2xl font-bold">
								{formatAmount(data?.income)}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Savings
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+573</div>
						<p className="text-xs text-muted-foreground">
							+201 since last hour
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-3 p-4">
				<RecentTransactions onAddTran={addTran}/>
				<div className="h-auto">
					<ExpenseBarChart />
				</div>
				
			</div>
		</div>
	);
}
