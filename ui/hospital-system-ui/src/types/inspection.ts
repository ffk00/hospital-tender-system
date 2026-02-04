import { InspectionStatus } from './enums'

// Response
export interface InspectionResponse {
  id: number
  tenderItemId: number
  inspectorId: number
  inspectorFullName: string
  inspectionDate: string
  status: InspectionStatus
  acceptedQuantity: number
  rejectedQuantity: number
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateInspectionRequest {
  tenderItemId: number
  inspectorId: number
  inspectionDate: string // dd-MM-yyyy
  status: InspectionStatus
  acceptedQuantity: number
  rejectedQuantity: number
  notes?: string
}

export interface UpdateInspectionRequest {
  inspectionDate?: string
  status?: InspectionStatus
  acceptedQuantity?: number
  rejectedQuantity?: number
  notes?: string
}
