'use client'

import Link from "next/link"
import {
    CircleUser,
    Menu,
    Package2,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "./ui/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/DarkToggle"
import { useRouter } from "next/navigation"
import { protected_api } from "@/utils/Request"
import SearchAssets from "./SearchAssets"
import { useAuth } from "./AuthProvider"
import { getFromLocalStorage } from "@/utils/Request"
import { useEffect } from "react"

export default function Navbar() {
    const router = useRouter()
    const { toast } = useToast()
    const { user } = useAuth()

    useEffect(() => {
      if(!getFromLocalStorage('apiToken')) router.push('/login')
    }, [])
    
    const logout = async () => {
      await protected_api.post('/api/logout')
      .then(() => {
        localStorage.removeItem('apiToken')
        localStorage.removeItem('user')
        router.push('/login')
      })
      .catch((err) => {
          console.log(err)
          toast({
          variant: "destructive",
          title: "Unknown error",
        })
      })
    }

    return (
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/assets"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Assets
          </Link>
          <Link
            href="/account"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Accounts
          </Link>
          
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/assets"
                className="text-muted-foreground hover:text-foreground"
              >
                Assets
              </Link>
              <Link
                href="/account"
                className="text-muted-foreground hover:text-foreground"
              >
                Accounts
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="relative ml-auto">
            <SearchAssets /> 
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hello, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
}