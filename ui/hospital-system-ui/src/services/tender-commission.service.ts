import api from './api'
import { TenderCommissionResponse, CreateTenderCommissionRequest } from '@/types'

export const tenderCommissionService = {
  getByTenderId: (tenderId: number) =>
    api.get<TenderCommissionResponse[]>(`/tender-commissions/tender/${tenderId}`).then((res) => res.data),

  create: (data: CreateTenderCommissionRequest) =>
    api.post<TenderCommissionResponse>('/tender-commissions', data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/tender-commissions/${id}`),
}
