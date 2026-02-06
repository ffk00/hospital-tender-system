import api from './api'
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '@/types'

export const userService = {
  getAll: () =>
    api.get<UserResponse[]>('/users').then((res) => res.data),

  getById: (id: number) =>
    api.get<UserResponse>(`/users/${id}`).then((res) => res.data),

  create: (data: CreateUserRequest) =>
    api.post<UserResponse>('/users', data).then((res) => res.data),

  update: (id: number, data: UpdateUserRequest) =>
    api.put<UserResponse>(`/users/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/users/${id}`),
}
