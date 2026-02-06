import api from './api'
import {
  MarketResearchOfferResponse,
  CreateMarketResearchOfferRequest,
  UpdateMarketResearchOfferRequest,
} from '@/types'

export const marketResearchOfferService = {
  getByTenderItemId: (tenderItemId: number) =>
    api.get<MarketResearchOfferResponse[]>(`/market-research-offers/tender-item/${tenderItemId}`).then((res) => res.data),

  getById: (id: number) =>
    api.get<MarketResearchOfferResponse>(`/market-research-offers/${id}`).then((res) => res.data),

  create: (data: CreateMarketResearchOfferRequest) =>
    api.post<MarketResearchOfferResponse>('/market-research-offers', data).then((res) => res.data),

  update: (id: number, data: UpdateMarketResearchOfferRequest) =>
    api.put<MarketResearchOfferResponse>(`/market-research-offers/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/market-research-offers/${id}`),

  calculateCost: (tenderItemId: number) =>
    api.post<number>(`/market-research-offers/tender-item/${tenderItemId}/calculate-cost`).then((res) => res.data),
}
