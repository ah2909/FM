'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { getFromLocalStorage } from "@/utils/Request"
import { api } from "@/utils/Request"
import { useEffect } from "react"

export default function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  
  useEffect(() => {
    if(getFromLocalStorage('apiToken')) router.push('/dashboard')
  })
  
  const signUp = async (formData: FormData) => {
    let tmp_data = Object.fromEntries(formData)
    let {first_name, last_name, ...data} = tmp_data
    data.name = tmp_data.last_name.toString() + tmp_data.first_name.toString()
    await api.post('/api/register', data)
        .then(() => {
            toast({
                title: "Register successfully",
              })
            router.push('/login')
           
        })
        .catch((err) => {
            toast({
                variant: 'destructive',
                title: err,
              })
        })
  }

  return (
    <div className="flex justify-center items-center pt-24">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signUp}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" name="first_name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" name="last_name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@sth.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
                id="password" 
                name="password"
                type="password"
                required  
              />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
