export interface SupplierResponse {
  id: number
  companyName: string
  taxNumber: string
  taxOffice: string | null
  bankName: string | null
  bankBranch: string | null
  iban: string | null
  contactName: string | null
  phone: string | null
  email: string | null
  address: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateSupplierRequest {
  companyName: string
  taxNumber: string
  taxOffice?: string
  bankName?: string
  bankBranch?: string
  iban?: string
  contactName?: string
  phone?: string
  email?: string
  address?: string
}

export interface UpdateSupplierRequest {
  companyName?: string
  taxNumber?: string
  taxOffice?: string
  bankName?: string
  bankBranch?: string
  iban?: string
  contactName?: string
  phone?: string
  email?: string
  address?: string
}
