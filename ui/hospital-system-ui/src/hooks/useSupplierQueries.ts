import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { supplierService } from '@/services/supplier.service'
import { CreateSupplierRequest, UpdateSupplierRequest } from '@/types'

export function useSuppliers() {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIERS,
    queryFn: supplierService.getAll,
  })
}

export function useSupplier(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.SUPPLIER(id),
    queryFn: () => supplierService.getById(id),
    enabled: !!id,
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateSupplierRequest) => supplierService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUPPLIERS })
      enqueueSnackbar('Tedarikçi başarıyla oluşturuldu', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Tedarikçi oluşturulurken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSupplierRequest }) =>
      supplierService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUPPLIERS })
      enqueueSnackbar('Tedarikçi başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Tedarikçi güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => supplierService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUPPLIERS })
      enqueueSnackbar('Tedarikçi başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Tedarikçi silinirken hata oluştu', { variant: 'error' })
    },
  })
}
