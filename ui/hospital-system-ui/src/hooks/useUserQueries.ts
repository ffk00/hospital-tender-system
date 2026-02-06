import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { userService } from '@/services/user.service'
import { CreateUserRequest, UpdateUserRequest } from '@/types'

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAll,
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
      enqueueSnackbar('Kullanıcı başarıyla oluşturuldu', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kullanıcı oluşturulurken hata oluştu', { variant: 'error' })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
      enqueueSnackbar('Kullanıcı başarıyla güncellendi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kullanıcı güncellenirken hata oluştu', { variant: 'error' })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
      enqueueSnackbar('Kullanıcı başarıyla silindi', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Kullanıcı silinirken hata oluştu', { variant: 'error' })
    },
  })
}
