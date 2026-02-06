import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { inspectionService } from '@/services/inspection.service'
import { CreateInspectionRequest, UpdateInspectionRequest, InspectionStatus } from '@/types'

export function useInspections(tenderId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.INSPECTIONS(tenderId),
    queryFn: () => inspectionService.getByTenderId(tenderId),
    enabled: !!tenderId,
  })
}

export function useCreateInspection(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateInspectionRequest) => inspectionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INSPECTIONS(tenderId) })
      enqueueSnackbar('Muayene kaydı başarıyla oluşturuldu', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Muayene kaydı oluşturulurken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateInspection(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInspectionRequest }) =>
      inspectionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INSPECTIONS(tenderId) })
      enqueueSnackbar('Muayene kaydı başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Muayene kaydı güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateInspectionStatus(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: InspectionStatus }) =>
      inspectionService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INSPECTIONS(tenderId) })
      enqueueSnackbar('Muayene durumu güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Muayene durumu güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteInspection(tenderId: number) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => inspectionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INSPECTIONS(tenderId) })
      enqueueSnackbar('Muayene kaydı başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Muayene kaydı silinirken hata oluştu', { variant: 'error' })
    },
  })
}
