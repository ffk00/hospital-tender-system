import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { officialBidService } from '@/services/official-bid.service'
import { CreateOfficialBidRequest } from '@/types'

export function useOfficialBids(tenderItemId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.OFFICIAL_BIDS(tenderItemId),
    queryFn: () => officialBidService.getByTenderItemId(tenderItemId),
    enabled: !!tenderItemId,
  })
}

export function useCreateOfficialBid(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateOfficialBidRequest) => officialBidService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OFFICIAL_BIDS(tenderItemId) })
      enqueueSnackbar('Teklif başarıyla eklendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif eklenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteOfficialBid(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => officialBidService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OFFICIAL_BIDS(tenderItemId) })
      enqueueSnackbar('Teklif başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif silinirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useEvaluateBids(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: () => officialBidService.evaluate(tenderItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OFFICIAL_BIDS(tenderItemId) })
      enqueueSnackbar('Teklifler değerlendirildi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklifler değerlendirilirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useRejectBid(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      officialBidService.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OFFICIAL_BIDS(tenderItemId) })
      enqueueSnackbar('Teklif reddedildi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif reddedilirken hata oluştu', { variant: 'error' })
    },
  })
}
