export interface MarketResearchOfferResponse {
  id: number
  tenderItemId: number
  tenderItemName: string
  supplierId: number
  supplierName: string
  offeredPrice: number
  offerDate: string | null
  notes: string | null
  createdAt: string
}

export interface CreateMarketResearchOfferRequest {
  tenderItemId: number
  supplierId: number
  offeredPrice: number
  offerDate?: string
  notes?: string
}

export interface UpdateMarketResearchOfferRequest {
  offeredPrice?: number
  offerDate?: string
  notes?: string
}
