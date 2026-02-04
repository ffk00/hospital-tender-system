// Response
export interface OfficialBidResponse {
  id: number
  tenderItemId: number
  supplierId: number
  supplierName: string
  unitPrice: number
  isWinner: boolean
  isRejected: boolean
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateOfficialBidRequest {
  tenderItemId: number
  supplierId: number
  unitPrice: number
}

export interface UpdateOfficialBidRequest {
  unitPrice?: number
}
