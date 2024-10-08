'use client'

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/AuthProvider"
import { getFromLocalStorage } from "@/utils/Request"

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState<Boolean>(false)
  const { login } = useAuth()
  
  useEffect(() => {
    if(getFromLocalStorage('apiToken')) router.push('/dashboard')
  }, [])
  
  const handleLogin = async (formData: FormData) => {
    let data = Object.fromEntries(formData)
    try {
      await login(data)
      setLoading(false)
      
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="w-full lg:grid lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form action={handleLogin} onSubmit={() => setLoading(true)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@sth.com"
                tabIndex={1}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password"
                name="password"
                type="password"
                tabIndex={2}
                required 
              />
            </div>
            {loading ? 
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Login
            </Button>
            :
            <Button type="submit" className="w-full">
              Login
            </Button>
            }
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="hidden bg-muted lg:block">
        <Image
          src="/login.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
    </div>
  )
}
