import { TenderMethod, TenderStatus } from './enums'

// Response
export interface TenderResponse {
  id: number
  registrationNumber: string
  approvalNumber: string
  title: string
  description: string
  method: TenderMethod
  status: TenderStatus
  approvalDate: string
  marketResearchDate: string
  tenderDate: string
  contractDate: string
  contractEndDate: string
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateTenderRequest {
  registrationNumber: string
  approvalNumber: string
  title: string
  description: string
  method: TenderMethod
  approvalDate: string // dd-MM-yyyy
  marketResearchDate: string // dd-MM-yyyy
  tenderDate: string // dd-MM-yyyy HH:mm
  contractDate: string // dd-MM-yyyy
  contractEndDate: string // dd-MM-yyyy
}

export interface UpdateTenderRequest {
  registrationNumber?: string
  approvalNumber?: string
  title?: string
  description?: string
  method?: TenderMethod
  status?: TenderStatus
  approvalDate?: string
  marketResearchDate?: string
  tenderDate?: string
  contractDate?: string
  contractEndDate?: string
}
