"use client";

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Vérifier si nous sommes côté client
    if (typeof window !== 'undefined') {
      // Check localStorage and system preference
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) return savedTheme

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'light' // default theme
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}