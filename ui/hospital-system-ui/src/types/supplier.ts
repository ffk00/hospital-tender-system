// Response
export interface SupplierResponse {
  id: number
  companyName: string
  taxNumber: string
  address: string
  phone: string
  email: string
  contactPerson: string
  bankName: string
  iban: string
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateSupplierRequest {
  companyName: string
  taxNumber: string
  address: string
  phone: string
  email: string
  contactPerson: string
  bankName: string
  iban: string
}

export interface UpdateSupplierRequest {
  companyName?: string
  taxNumber?: string
  address?: string
  phone?: string
  email?: string
  contactPerson?: string
  bankName?: string
  iban?: string
}
