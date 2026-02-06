import api from './api'
import { SupplierResponse, CreateSupplierRequest, UpdateSupplierRequest } from '@/types'

export const supplierService = {
  getAll: () =>
    api.get<SupplierResponse[]>('/suppliers').then((res) => res.data),

  getById: (id: number) =>
    api.get<SupplierResponse>(`/suppliers/${id}`).then((res) => res.data),

  create: (data: CreateSupplierRequest) =>
    api.post<SupplierResponse>('/suppliers', data).then((res) => res.data),

  update: (id: number, data: UpdateSupplierRequest) =>
    api.put<SupplierResponse>(`/suppliers/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/suppliers/${id}`),
}
