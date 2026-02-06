import { CommissionRole } from './enums'

export interface TenderCommissionResponse {
  id: number
  tenderId: number
  userId: number
  userFullName: string
  userTitle: string | null
  role: CommissionRole
  createdAt: string
}

export interface CreateTenderCommissionRequest {
  tenderId: number
  userId: number
  role: CommissionRole
}
