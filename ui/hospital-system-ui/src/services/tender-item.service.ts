import api from './api'
import { TenderItemResponse, CreateTenderItemRequest, UpdateTenderItemRequest } from '@/types'

export const tenderItemService = {
  getByTenderId: (tenderId: number) =>
    api.get<TenderItemResponse[]>(`/tender-items/tender/${tenderId}`).then((res) => res.data),

  getById: (id: number) =>
    api.get<TenderItemResponse>(`/tender-items/${id}`).then((res) => res.data),

  create: (data: CreateTenderItemRequest) =>
    api.post<TenderItemResponse>('/tender-items', data).then((res) => res.data),

  update: (id: number, data: UpdateTenderItemRequest) =>
    api.put<TenderItemResponse>(`/tender-items/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/tender-items/${id}`),
}
