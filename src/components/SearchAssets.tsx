"use client";

import { Search } from "lucide-react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Loader2 } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { searchAsset } from "@/lib/api";
import Image from "next/image";

export default function SearchAssets() {
    const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Array<any>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const searchTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const getRecomendation = async () => {
			const results = await searchAsset(searchQuery);
			setSearchResults(results.coins);
			setIsLoading(false);
			setOpen(true);
		};
		if (searchQuery.length > 2) {
			setIsLoading(true);
			if (searchTimeout.current) {
				clearTimeout(searchTimeout.current);
			}
			searchTimeout.current = setTimeout(() => getRecomendation(), 300);
		}

		return () => {
			if (searchTimeout.current) {
				clearTimeout(searchTimeout.current);
			}
		};
	}, [searchQuery]);

	const handleSelectAsset = (asset: any) => {
		setSearchQuery(`${asset.name}`);
		setOpen(false);
		// You can add additional logic here, e.g., navigating to asset details page
	};

	const handleOpen = (open: boolean) => {
		setOpen(open);
		if (!open) {
			setSearchQuery("");
			setSearchResults([]);
		}
	};

	return (
		<Popover open={open} onOpenChange={handleOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" aria-expanded={open}>
					<Search className="h-4 w-4 mr-2 text-muted-foreground" />
					Select asset
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0" align="start">
				<Command>
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search asset"
					/>
					<CommandList>
						{isLoading ? (
							<Loader2 className="mx-auto my-2 h-8 w-8 animate-spin" />
						) : (
							searchResults?.map((asset: any) => (
								<a
									key={asset.id}
									target="_blank"
									href={`https://www.coingecko.com/en/coins/${asset.id}`}
									rel="noopener noreferrer"
								>
									<CommandItem
										onSelect={() =>
											handleSelectAsset(asset)
										}
									>
										<Image
											src={asset.thumb}
											alt="logo"
											width={20}
											height={20}
										/>
										<span className="ml-2">
											{asset.name}
										</span>
										<span className="ml-1 text-muted-foreground">
											({asset.symbol})
										</span>
									</CommandItem>
								</a>
							))
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
