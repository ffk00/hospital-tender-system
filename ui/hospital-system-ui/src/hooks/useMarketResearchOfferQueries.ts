import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { marketResearchOfferService } from '@/services/market-research-offer.service'
import { CreateMarketResearchOfferRequest, UpdateMarketResearchOfferRequest } from '@/types'

export function useMarketResearchOffers(tenderItemId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.MARKET_RESEARCH_OFFERS(tenderItemId),
    queryFn: () => marketResearchOfferService.getByTenderItemId(tenderItemId),
    enabled: !!tenderItemId,
  })
}

export function useCreateMarketResearchOffer(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateMarketResearchOfferRequest) =>
      marketResearchOfferService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET_RESEARCH_OFFERS(tenderItemId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEM(tenderItemId) })
      enqueueSnackbar('Teklif başarıyla eklendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif eklenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateMarketResearchOffer(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMarketResearchOfferRequest }) =>
      marketResearchOfferService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET_RESEARCH_OFFERS(tenderItemId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEM(tenderItemId) })
      enqueueSnackbar('Teklif başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteMarketResearchOffer(tenderItemId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => marketResearchOfferService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET_RESEARCH_OFFERS(tenderItemId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TENDER_ITEM(tenderItemId) })
      enqueueSnackbar('Teklif başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Teklif silinirken hata oluştu', { variant: 'error' })
    },
  })
}
