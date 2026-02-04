import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthUser, UserRole } from '@/types'

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (token: string, email: string, role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    const storedRole = localStorage.getItem('role') as UserRole | null

    if (storedToken && storedEmail && storedRole) {
      setToken(storedToken)
      setUser({ email: storedEmail, role: storedRole })
    }
  }, [])

  const login = (newToken: string, email: string, role: UserRole) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', email)
    localStorage.setItem('role', role)
    setToken(newToken)
    setUser({ email, role })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
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
