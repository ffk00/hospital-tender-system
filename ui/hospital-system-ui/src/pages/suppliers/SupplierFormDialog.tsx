import { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SupplierResponse } from '@/types'

const supplierSchema = z.object({
  companyName: z.string().min(1, 'Firma adı gereklidir'),
  taxNumber: z.string().min(1, 'Vergi numarası gereklidir'),
  taxOffice: z.string().optional(),
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  iban: z.string().optional(),
  contactName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçerli bir e-posta giriniz').or(z.literal('')).optional(),
  address: z.string().optional(),
})

type SupplierFormData = z.infer<typeof supplierSchema>

interface SupplierFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: SupplierFormData) => void
  supplier?: SupplierResponse | null
  isLoading?: boolean
}

export default function SupplierFormDialog({
  open,
  onClose,
  onSubmit,
  supplier,
  isLoading,
}: SupplierFormDialogProps) {
  const isEdit = !!supplier

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  })

  useEffect(() => {
    if (supplier) {
      reset({
        companyName: supplier.companyName,
        taxNumber: supplier.taxNumber,
        taxOffice: supplier.taxOffice || '',
        bankName: supplier.bankName || '',
        bankBranch: supplier.bankBranch || '',
        iban: supplier.iban || '',
        contactName: supplier.contactName || '',
        phone: supplier.phone || '',
        email: supplier.email || '',
        address: supplier.address || '',
      })
    } else {
      reset({
        companyName: '',
        taxNumber: '',
        taxOffice: '',
        bankName: '',
        bankBranch: '',
        iban: '',
        contactName: '',
        phone: '',
        email: '',
        address: '',
      })
    }
  }, [supplier, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {isEdit ? 'Tedarikçi Düzenle' : 'Yeni Tedarikçi'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Firma Adı"
                fullWidth
                {...register('companyName')}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Vergi Numarası"
                fullWidth
                {...register('taxNumber')}
                error={!!errors.taxNumber}
                helperText={errors.taxNumber?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Vergi Dairesi"
                fullWidth
                {...register('taxOffice')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="İletişim Kişisi"
                fullWidth
                {...register('contactName')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Telefon"
                fullWidth
                {...register('phone')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="E-posta"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Banka Adı"
                fullWidth
                {...register('bankName')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Banka Şubesi"
                fullWidth
                {...register('bankBranch')}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="IBAN"
                fullWidth
                {...register('iban')}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Adres"
                fullWidth
                multiline
                rows={2}
                {...register('address')}
              />
            </Grid>
          </Grid>
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
