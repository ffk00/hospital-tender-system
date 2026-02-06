import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthUser, AuthResponse, UserRole } from '@/types'

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (response: AuthResponse) => void
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
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (response: AuthResponse) => {
    const authUser: AuthUser = {
      userId: response.userId,
      email: response.email,
      fullName: response.fullName,
      role: response.role,
    }
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(authUser))
    setToken(response.token)
    setUser(authUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
