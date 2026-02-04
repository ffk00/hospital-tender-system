import { UnitType } from './enums'

// Response
export interface TenderItemResponse {
  id: number
  tenderId: number
  itemName: string
  quantity: number
  unit: UnitType
  approximateUnitCost: number | null
  createdAt: string
  updatedAt: string
}

// Requests
export interface CreateTenderItemRequest {
  tenderId: number
  itemName: string
  quantity: number
  unit: UnitType
}

export interface UpdateTenderItemRequest {
  itemName?: string
  quantity?: number
  unit?: UnitType
}
