import { UserRole } from './enums'

// Response
export interface UserResponse {
  id: number
  firstName: string
  lastName: string
  title: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateUserRequest {
  firstName: string
  lastName: string
  title: string
  email: string
  password: string
  role: UserRole
}

export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  title?: string
  email?: string
  role?: UserRole
  isActive?: boolean
}
