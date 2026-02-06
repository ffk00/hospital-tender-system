import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { tenderService } from '@/services/tender.service'
import { CreateTenderRequest, UpdateTenderRequest, TenderStatus } from '@/types'

export function useTenders() {
  return useQuery({
    queryKey: QUERY_KEYS.TENDERS,
    queryFn: tenderService.getAll,
  })
}

export function useTender(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.TENDER(id),
    queryFn: () => tenderService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTender() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateTenderRequest) => tenderService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDERS })
      enqueueSnackbar('İhale başarıyla oluşturuldu', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('İhale oluşturulurken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateTender() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTenderRequest }) =>
      tenderService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDERS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(variables.id) })
      enqueueSnackbar('İhale başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('İhale güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateTenderStatus() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TenderStatus }) =>
      tenderService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDERS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(variables.id) })
      enqueueSnackbar('İhale durumu güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('İhale durumu güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteTender() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => tenderService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDERS })
      enqueueSnackbar('İhale başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('İhale silinirken hata oluştu', { variant: 'error' })
    },
  })
}
