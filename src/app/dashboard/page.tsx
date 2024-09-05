"use client";

import Link from "next/link";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import DateRangePicker from "@/components/DateRangePicker";
import TransactionDialog from "@/components/TransactionDialog";
import { useTransactions, calculateStatistics } from "@/lib/api";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";
import { IconContext } from "react-icons";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const { trans, isLoading, isError } = useTransactions(page);

  useEffect(() => {
    const getData = async () => {
      await calculateStatistics(dateRange)
        .then((res) => {
          setData(res);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  const handleDateRangeChange = async (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);

    await calculateStatistics(newDateRange)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };

  const renderPagination = (totalPages: number) => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItems;
  };

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function formatAmount(amount: string) {
    let number = parseInt(amount, 10);

    // Format the number with a dot as the thousand separator
    let formattedNumber = number.toLocaleString("vi-VN");

    // Append the currency symbol
    return `${formattedNumber} VNĐ`;
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-row-reverse">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
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
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
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
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions of this week.
                </CardDescription>
              </div>
              <div className="ml-auto gap-1 bg-background">
                <TransactionDialog />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
                  <Skeleton className="h-5 w-auto mt-3" />
                </div>
              ) : trans?.data?.data?.length == 0 ? (
                <p className="text-center font-semibold">
                  Not have transaction yet.
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-base font-semibold">
                          Content
                        </TableHead>
                        <TableHead className="text-base font-semibold text-center">
                          Category
                        </TableHead>
                        <TableHead className="text-base font-semibold text-center">
                          Amount
                        </TableHead>
                        <TableHead className="text-base font-semibold text-center">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trans?.data?.data.map((tran: any) => (
                        <TableRow key={tran.id}>
                          <TableCell>
                            <div className="flex">
                              {tran.type === "EXPENSE" ? (
                                <IconContext.Provider
                                  value={{ color: "red", size: "1rem" }}
                                >
                                  <HiArrowDownLeft />
                                </IconContext.Provider>
                              ) : (
                                <IconContext.Provider
                                  value={{ color: "green", size: "1rem" }}
                                >
                                  <HiArrowUpRight />
                                </IconContext.Provider>
                              )}
                              <p className="ml-3 font-semibold">
                                {tran.content}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-semibold">
                            {tran.category?.name}
                          </TableCell>
                          <TableCell className="text-center font-semibold">
                            {formatAmount(tran.amount)}
                          </TableCell>
                          <TableCell className="text-center font-semibold">
                            {formatDate(tran.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Pagination>
                    <PaginationContent>
                      {page !== 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() => setPage(page - 1)}
                          />
                        </PaginationItem>
                      )}

                      {renderPagination(parseInt(trans?.data?.last_page))}
                      {/* <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem> */}

                      {page !== parseInt(trans?.data?.last_page) && (
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() => setPage(page + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
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
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
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
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
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
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
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
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
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
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
