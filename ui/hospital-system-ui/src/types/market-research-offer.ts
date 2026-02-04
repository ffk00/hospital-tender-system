// Response
export interface MarketResearchOfferResponse {
  id: number
  tenderItemId: number
  supplierId: number
  supplierName: string
  unitPrice: number
  notes: string | null
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateMarketResearchOfferRequest {
  tenderItemId: number
  supplierId: number
  unitPrice: number
  notes?: string
}

export interface UpdateMarketResearchOfferRequest {
  unitPrice?: number
  notes?: string
}
