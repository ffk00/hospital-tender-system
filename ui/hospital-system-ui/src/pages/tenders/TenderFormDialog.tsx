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
  Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TenderResponse, TenderMethod } from '@/types'
import { tenderMethodLabels } from '@/constants/labels'

const tenderSchema = z.object({
  title: z.string().min(1, 'İhale başlığı gereklidir'),
  description: z.string().optional(),
  method: z.nativeEnum(TenderMethod, { message: 'İhale usulü seçiniz' }),
  registrationNumber: z.string().optional(),
  approvalNumber: z.string().optional(),
  approvalDate: z.string().optional(),
  marketResearchDate: z.string().optional(),
  tenderDate: z.string().optional(),
  contractDate: z.string().optional(),
  contractEndDate: z.string().optional(),
})

type TenderFormData = z.infer<typeof tenderSchema>

interface TenderFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: TenderFormData) => void
  tender?: TenderResponse | null
  isLoading?: boolean
}

export default function TenderFormDialog({
  open,
  onClose,
  onSubmit,
  tender,
  isLoading,
}: TenderFormDialogProps) {
  const isEdit = !!tender

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenderFormData>({
    resolver: zodResolver(tenderSchema),
  })

  useEffect(() => {
    if (tender) {
      reset({
        title: tender.title,
        description: tender.description || '',
        method: tender.method,
        registrationNumber: tender.registrationNumber || '',
        approvalNumber: tender.approvalNumber || '',
        approvalDate: tender.approvalDate || '',
        marketResearchDate: tender.marketResearchDate || '',
        tenderDate: tender.tenderDate || '',
        contractDate: tender.contractDate || '',
        contractEndDate: tender.contractEndDate || '',
      })
    } else {
      reset({
        title: '',
        description: '',
        method: TenderMethod.DIRECT_PROCUREMENT,
        registrationNumber: '',
        approvalNumber: '',
        approvalDate: '',
        marketResearchDate: '',
        tenderDate: '',
        contractDate: '',
        contractEndDate: '',
      })
    }
  }, [tender, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {isEdit ? 'İhale Düzenle' : 'Yeni İhale'}
        </DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="İhale Başlığı"
                fullWidth
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Açıklama"
                fullWidth
                multiline
                rows={2}
                {...register('description')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="İhale Usulü"
                select
                fullWidth
                defaultValue={tender?.method || TenderMethod.DIRECT_PROCUREMENT}
                {...register('method')}
                error={!!errors.method}
                helperText={errors.method?.message}
              >
                {Object.values(TenderMethod).map((method) => (
                  <MenuItem key={method} value={method}>
                    {tenderMethodLabels[method]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="İKN (Kayıt No)"
                fullWidth
                {...register('registrationNumber')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Onay Numarası"
                fullWidth
                {...register('approvalNumber')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Onay Tarihi"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('approvalDate')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Piyasa Araştırma Tarihi"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('marketResearchDate')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="İhale Tarihi"
                type="datetime-local"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('tenderDate')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Sözleşme Tarihi"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('contractDate')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Sözleşme Bitiş Tarihi"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('contractEndDate')}
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
