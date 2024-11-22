"use client";

import React from 'react'
import { Bell, Search, User, Moon, Sun, LogOut } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useTheme } from '../ThemeProvider'
import { useRouter } from 'next/navigation'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : ''

  const handleLogout = () => {
    localStorage.removeItem('username')
    router.push('/login')
  }

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9 pr-4 py-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {username}
        </span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className="text-foreground hover:text-foreground/80"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-foreground hover:text-foreground/80"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-foreground hover:text-foreground/80"
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="text-foreground hover:text-foreground/80"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}