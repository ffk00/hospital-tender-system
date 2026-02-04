import { UserRole } from './enums'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  title: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  email: string
  role: UserRole
}

export interface AuthUser {
  email: string
  role: UserRole
}
