export interface OfficialBidResponse {
  id: number
  tenderItemId: number
  tenderItemName: string
  supplierId: number
  supplierName: string
  bidPrice: number
  isValid: boolean
  isWinningBid: boolean
  rejectionReason: string | null
  createdAt: string
}

export interface CreateOfficialBidRequest {
  tenderItemId: number
  supplierId: number
  bidPrice: number
}
