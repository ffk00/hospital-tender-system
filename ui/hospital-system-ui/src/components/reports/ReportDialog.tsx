import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { downloadPdf } from '@/utils/fileDownload'

export interface ReportField {
  name: string
  label: string
  type: 'text' | 'date' | 'select'
  options?: { value: string | number; label: string }[]
  required?: boolean
}

interface ReportDialogProps {
  open: boolean
  onClose: () => void
  title: string
  fields: ReportField[]
  onGenerate: (values: Record<string, unknown>) => Promise<Blob>
  fileName: string
}

export default function ReportDialog({
  open,
  onClose,
  title,
  fields,
  onGenerate,
  fileName,
}: ReportDialogProps) {
  const [values, setValues] = useState<Record<string, string | number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (name: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      const blob = await onGenerate(values)
      downloadPdf(blob, fileName)
      enqueueSnackbar('Rapor başarıyla oluşturuldu', { variant: 'success' })
      onClose()
      setValues({})
    } catch {
      setError('Rapor oluşturulurken bir hata oluştu.')
      enqueueSnackbar('Rapor oluşturulurken hata oluştu', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setValues({})
      setError(null)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {fields.map((field) => {
          if (field.type === 'select' && field.options) {
            return (
              <TextField
                key={field.name}
                label={field.label}
                select
                fullWidth
                value={values[field.name] ?? ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
              >
                {field.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )
          }
          return (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type === 'date' ? 'date' : 'text'}
              fullWidth
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              slotProps={field.type === 'date' ? { inputLabel: { shrink: true } } : undefined}
            />
          )
        })}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          İptal
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Rapor Oluştur'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
