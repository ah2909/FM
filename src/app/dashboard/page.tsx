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
		<div className="flex min-h-screen w-full flex-col">
			<Navbar />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="flex flex-row-reverse">
					<DateRangePicker
						onDateRangeChange={handleDateRangeChange}
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<RecentTransactions onAddTran={addTran}/>
					{/* <Card x-chunk="dashboard-01-chunk-5">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-8">
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/01.png" alt="Avatar" />
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Olivia Martin
									</p>
									<p className="text-sm text-muted-foreground">
										olivia.martin@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$1,999.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/02.png" alt="Avatar" />
									<AvatarFallback>JL</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Jackson Lee
									</p>
									<p className="text-sm text-muted-foreground">
										jackson.lee@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$39.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/03.png" alt="Avatar" />
									<AvatarFallback>IN</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Isabella Nguyen
									</p>
									<p className="text-sm text-muted-foreground">
										isabella.nguyen@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$299.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/04.png" alt="Avatar" />
									<AvatarFallback>WK</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										William Kim
									</p>
									<p className="text-sm text-muted-foreground">
										will@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$99.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/05.png" alt="Avatar" />
									<AvatarFallback>SD</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Sofia Davis
									</p>
									<p className="text-sm text-muted-foreground">
										sofia.davis@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$39.00
								</div>
							</div>
						</CardContent>
					</Card> */}
					<div className="h-auto">
						<ExpenseBarChart />
					</div>
					
				</div>
			</main>
		</div>
	);
}
