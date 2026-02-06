import { TenderMethod, TenderStatus } from './enums'

export interface TenderResponse {
  id: number
  registrationNumber: string | null
  approvalNumber: string | null
  title: string
  description: string | null
  method: TenderMethod
  status: TenderStatus
  approvalDate: string | null
  marketResearchDate: string | null
  tenderDate: string | null
  contractDate: string | null
  contractEndDate: string | null
  createdAt: string
  updatedAt: string
  itemCount: number
  commissionMemberCount: number
}

export interface CreateTenderRequest {
  registrationNumber?: string
  approvalNumber?: string
  title: string
  description?: string
  method: TenderMethod
  approvalDate?: string
  marketResearchDate?: string
  tenderDate?: string
  contractDate?: string
  contractEndDate?: string
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
