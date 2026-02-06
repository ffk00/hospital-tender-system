import api from './api'
import {
  InspectionResponse,
  CreateInspectionRequest,
  UpdateInspectionRequest,
  InspectionStatus,
} from '@/types'

export const inspectionService = {
  getByTenderId: (tenderId: number) =>
    api.get<InspectionResponse[]>(`/inspections/tender/${tenderId}`).then((res) => res.data),

  getById: (id: number) =>
    api.get<InspectionResponse>(`/inspections/${id}`).then((res) => res.data),

  getByStatus: (status: InspectionStatus) =>
    api.get<InspectionResponse[]>(`/inspections/status/${status}`).then((res) => res.data),

  create: (data: CreateInspectionRequest) =>
    api.post<InspectionResponse>('/inspections', data).then((res) => res.data),

  update: (id: number, data: UpdateInspectionRequest) =>
    api.put<InspectionResponse>(`/inspections/${id}`, data).then((res) => res.data),

  updateStatus: (id: number, status: InspectionStatus) =>
    api.patch<InspectionResponse>(`/inspections/${id}/status`, null, { params: { status } }).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/inspections/${id}`),
}
