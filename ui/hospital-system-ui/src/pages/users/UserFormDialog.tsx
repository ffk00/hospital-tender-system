import { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserResponse, UserRole } from '@/types'

const userSchema = z.object({
  firstName: z.string().min(1, 'Ad gereklidir'),
  lastName: z.string().min(1, 'Soyad gereklidir'),
  title: z.string().optional(),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  role: z.nativeEnum(UserRole, { message: 'Rol seçiniz' }),
})

const userUpdateSchema = userSchema.omit({ password: true }).extend({
  isActive: z.boolean().optional(),
})

type UserFormData = z.infer<typeof userSchema>
type UserUpdateFormData = z.infer<typeof userUpdateSchema>

const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Yönetici',
  [UserRole.USER]: 'Kullanıcı',
  [UserRole.COMMISSIONER]: 'Komisyon Üyesi',
}

interface UserFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: UserFormData | UserUpdateFormData) => void
  user?: UserResponse | null
  isLoading?: boolean
}

export default function UserFormDialog({
  open,
  onClose,
  onSubmit,
  user,
  isLoading,
}: UserFormDialogProps) {
  const isEdit = !!user

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(isEdit ? userUpdateSchema : userSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title || '',
        email: user.email,
        role: user.role,
        password: '',
      })
    } else {
      reset({
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        role: UserRole.USER,
        password: '',
      })
    }
  }, [user, reset])

  const handleFormSubmit = (data: UserFormData) => {
    if (isEdit) {
      const { password, ...updateData } = data
      onSubmit(updateData)
    } else {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>
          {isEdit ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField
            label="Ad"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Soyad"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Ünvan"
            fullWidth
            {...register('title')}
          />
          <TextField
            label="E-posta"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {!isEdit && (
            <TextField
              label="Şifre"
              type="password"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
          <TextField
            label="Rol"
            select
            fullWidth
            defaultValue={user?.role || UserRole.USER}
            {...register('role')}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            {Object.values(UserRole).map((role) => (
              <MenuItem key={role} value={role}>
                {roleLabels[role]}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isLoading}>
            İptal
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : isEdit ? 'Güncelle' : 'Oluştur'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
