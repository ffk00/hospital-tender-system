import api from './api'
import { OfficialBidResponse, CreateOfficialBidRequest } from '@/types'

export const officialBidService = {
  getByTenderItemId: (tenderItemId: number) =>
    api.get<OfficialBidResponse[]>(`/official-bids/tender-item/${tenderItemId}`).then((res) => res.data),

  getValidByTenderItemId: (tenderItemId: number) =>
    api.get<OfficialBidResponse[]>(`/official-bids/tender-item/${tenderItemId}/valid`).then((res) => res.data),

  getById: (id: number) =>
    api.get<OfficialBidResponse>(`/official-bids/${id}`).then((res) => res.data),

  create: (data: CreateOfficialBidRequest) =>
    api.post<OfficialBidResponse>('/official-bids', data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/official-bids/${id}`),

  evaluate: (tenderItemId: number) =>
    api.post<OfficialBidResponse>(`/official-bids/tender-item/${tenderItemId}/evaluate`).then((res) => res.data),

  reject: (id: number, reason: string) =>
    api.patch<OfficialBidResponse>(`/official-bids/${id}/reject`, null, { params: { reason } }).then((res) => res.data),
}
