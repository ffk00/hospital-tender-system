import api from './api'
import { TenderResponse, CreateTenderRequest, UpdateTenderRequest, TenderStatus } from '@/types'

export const tenderService = {
  getAll: () =>
    api.get<TenderResponse[]>('/tenders').then((res) => res.data),

  getById: (id: number) =>
    api.get<TenderResponse>(`/tenders/${id}`).then((res) => res.data),

  getByStatus: (status: TenderStatus) =>
    api.get<TenderResponse[]>(`/tenders/status/${status}`).then((res) => res.data),

  create: (data: CreateTenderRequest) =>
    api.post<TenderResponse>('/tenders', data).then((res) => res.data),

  update: (id: number, data: UpdateTenderRequest) =>
    api.put<TenderResponse>(`/tenders/${id}`, data).then((res) => res.data),

  updateStatus: (id: number, status: TenderStatus) =>
    api.patch<TenderResponse>(`/tenders/${id}/status`, null, { params: { status } }).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/tenders/${id}`),
}
