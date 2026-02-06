import { InspectionStatus } from './enums'

export interface InspectionResponse {
  id: number
  tenderId: number
  tenderTitle: string
  supplierId: number
  supplierName: string
  reportNumber: string | null
  inspectionDate: string | null
  invoiceNumber: string | null
  committeeReport: string | null
  status: InspectionStatus | null
  createdAt: string
  updatedAt: string
}

export interface CreateInspectionRequest {
  tenderId: number
  supplierId: number
  reportNumber?: string
  inspectionDate?: string
  invoiceNumber?: string
  committeeReport?: string
}

export interface UpdateInspectionRequest {
  reportNumber?: string
  inspectionDate?: string
  invoiceNumber?: string
  committeeReport?: string
}
