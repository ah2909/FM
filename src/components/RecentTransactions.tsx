"use  client"
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
import TransactionDialog from "@/components/TransactionDialog";
import { useTransactions } from "@/lib/api";
import { useEffect, useState } from "react";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";
import { IconContext } from "react-icons";

export function RecentTransactions({ onAddTran }: { onAddTran: (tran: any[]) => void }) {
    const [page, setPage] = useState<number>(1);
	const { trans, isLoading, isError } = useTransactions(page);

    useEffect(() => {
        onAddTran(trans)
    }, [trans])

    function formatDate(isoDate: string) {
		const date = new Date(isoDate);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		// const hours = date.getHours().toString().padStart(2, "0");
		// const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${day}/${month}/${year}`;
	}

	function formatAmount(amount: string) {
		let number = parseInt(amount, 10);
		let formattedNumber = number.toLocaleString("vi-VN");

		return `${formattedNumber} VNĐ`;
	}

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
    return (
        <Card
            className="xl:col-span-2"
            x-chunk="dashboard-01-chunk-4"
        >
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
                                {trans?.data?.data.map(
                                    (tran: any) => (
                                        <TableRow key={tran.id}>
                                            <TableCell>
                                                <div className="flex">
                                                    {tran.type ===
                                                    "EXPENSE" ? (
                                                        <IconContext.Provider
                                                            value={{
                                                                color: "red",
                                                                size: "1rem",
                                                            }}
                                                        >
                                                            <HiArrowDownLeft />
                                                        </IconContext.Provider>
                                                    ) : (
                                                        <IconContext.Provider
                                                            value={{
                                                                color: "green",
                                                                size: "1rem",
                                                            }}
                                                        >
                                                            <HiArrowUpRight />
                                                        </IconContext.Provider>
                                                    )}
                                                    <p className="ml-3 font-semibold">
                                                        {
                                                            tran.content
                                                        }
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {
                                                    tran.category
                                                        ?.name
                                                }
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {formatAmount(
                                                    tran.amount
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {formatDate(
                                                    tran.created_at
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>

                        <Pagination>
                            <PaginationContent>
                                {page !== 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={() =>
                                                setPage(page - 1)
                                            }
                                        />
                                    </PaginationItem>
                                )}

                                {renderPagination(
                                    parseInt(trans?.data?.last_page)
                                )}
                                {/* <PaginationItem>
                                    <PaginationEllipsis />
                                    </PaginationItem> */}

                                {page !==
                                    parseInt(
                                        trans?.data?.last_page
                                    ) && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={() =>
                                                setPage(page + 1)
                                            }
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </>
                )}
            </CardContent>
        </Card>
    )
}