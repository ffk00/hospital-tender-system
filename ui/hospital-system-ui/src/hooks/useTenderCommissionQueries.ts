import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { tenderCommissionService } from '@/services/tender-commission.service'
import { CreateTenderCommissionRequest } from '@/types'

export function useTenderCommissions(tenderId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.TENDER_COMMISSIONS(tenderId),
    queryFn: () => tenderCommissionService.getByTenderId(tenderId),
    enabled: !!tenderId,
  })
}

export function useTenderCommissionsByUser(userId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.USER_COMMISSIONS(userId),
    queryFn: () => tenderCommissionService.getByUserId(userId),
    enabled: !!userId,
  })
}

export function useCreateTenderCommission(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateTenderCommissionRequest) =>
      tenderCommissionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_COMMISSIONS(tenderId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(tenderId) })
      enqueueSnackbar('Komisyon üyesi başarıyla eklendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Komisyon üyesi eklenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteTenderCommission(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => tenderCommissionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_COMMISSIONS(tenderId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER(tenderId) })
      enqueueSnackbar('Komisyon üyesi başarıyla kaldırıldı', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Komisyon üyesi kaldırılırken hata oluştu', { variant: 'error' })
    },
  })
}
