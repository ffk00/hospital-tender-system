import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { tenderItemService } from '@/services/tender-item.service'
import { CreateTenderItemRequest, UpdateTenderItemRequest } from '@/types'

export function useTenderItems(tenderId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.TENDER_ITEMS(tenderId),
    queryFn: () => tenderItemService.getByTenderId(tenderId),
    enabled: !!tenderId,
  })
}

export function useTenderItem(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.TENDER_ITEM(id),
    queryFn: () => tenderItemService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTenderItem(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateTenderItemRequest) => tenderItemService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEMS(tenderId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(tenderId) })
      enqueueSnackbar('Kalem başarıyla eklendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kalem eklenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateTenderItem(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTenderItemRequest }) =>
      tenderItemService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEMS(tenderId) })
      enqueueSnackbar('Kalem başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kalem güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteTenderItem(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => tenderItemService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEMS(tenderId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(tenderId) })
      enqueueSnackbar('Kalem başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kalem silinirken hata oluştu', { variant: 'error' })
    },
  })
}
