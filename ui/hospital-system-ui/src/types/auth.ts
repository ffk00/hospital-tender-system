import { UserRole } from './enums'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  title?: string
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  token: string
  userId: number
  email: string
  fullName: string
  role: UserRole
}

export interface AuthUser {
  userId: number
  email: string
  fullName: string
  role: UserRole
}
