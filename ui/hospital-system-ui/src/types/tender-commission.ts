import { CommissionRole } from './enums'

// Response
export interface TenderCommissionResponse {
  id: number
  tenderId: number
  userId: number
  userFullName: string
  role: CommissionRole
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateTenderCommissionRequest {
  tenderId: number
  userId: number
  role: CommissionRole
}

export interface UpdateTenderCommissionRequest {
  role?: CommissionRole
}
