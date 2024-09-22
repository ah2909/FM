'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/Request'

type AuthContextType = {
  user: any
  isAuthenticated: any
  login: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  
  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (data: any) => {
    // let data = Object.fromEntries(formData)
    await api.post('/api/login', data)
    .then((res) => {
      localStorage.setItem('apiToken', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data))
      setUser(res.data)
      setIsAuthenticated(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}