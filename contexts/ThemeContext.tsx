import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      // During SSR, set default theme on document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      return
    }
    
    setMounted(true)
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) 
      ? savedTheme 
      : (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme)
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  // Always render the Provider, but use default theme during SSR
  // This prevents the "must be used within ThemeProvider" error
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

