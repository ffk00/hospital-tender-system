import { UnitType } from './enums'

export interface TenderItemResponse {
  id: number
  tenderId: number
  itemName: string
  quantity: number
  unit: UnitType
  approximateUnitCost: number | null
  specifications: string | null
  createdAt: string
  updatedAt: string
  marketResearchOfferCount: number
  officialBidCount: number
}

export interface CreateTenderItemRequest {
  tenderId: number
  itemName: string
  quantity: number
  unit: UnitType
  specifications?: string
}

export interface UpdateTenderItemRequest {
  itemName?: string
  quantity?: number
  unit?: UnitType
  specifications?: string
}
