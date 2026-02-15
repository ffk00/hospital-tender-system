import { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
  Paper,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useInspections,
  useCreateInspection,
  useUpdateInspection,
  useUpdateInspectionStatus,
  useDeleteInspection,
} from '@/hooks/useInspectionQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { useTenderItems } from '@/hooks/useTenderItemQueries'
import { InspectionResponse, InspectionStatus, TenderItemResponse } from '@/types'
import { inspectionStatusLabels, unitTypeLabels } from '@/constants/labels'

const inspectionSchema = z.object({
  supplierId: z.coerce.number().min(1, 'Tedarikçi seçiniz'),
  reportNumber: z.string().optional(),
  inspectionDate: z.string().optional(),
  invoiceNumber: z.string().optional(),
  committeeReport: z.string().optional(),
})

type InspectionFormData = z.infer<typeof inspectionSchema>

interface InspectionTabProps {
  tenderId: number
}

export default function InspectionTab({ tenderId }: InspectionTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedInspection, setSelectedInspection] = useState<InspectionResponse | null>(null)

  const { data: inspections = [], isLoading } = useInspections(tenderId)
  const { data: suppliers = [] } = useSuppliers()
  const { data: items = [] } = useTenderItems(tenderId)
  const createInspection = useCreateInspection(tenderId)
  const updateInspection = useUpdateInspection(tenderId)
  const updateStatus = useUpdateInspectionStatus(tenderId)
  const deleteInspection = useDeleteInspection(tenderId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
  })

  const handleCreate = () => {
    setSelectedInspection(null)
    reset({ supplierId: 0, reportNumber: '', inspectionDate: '', invoiceNumber: '', committeeReport: '' })
    setDialogOpen(true)
  }

  const handleEdit = (inspection: InspectionResponse) => {
    setSelectedInspection(inspection)
    reset({
      supplierId: inspection.supplierId,
      reportNumber: inspection.reportNumber || '',
      inspectionDate: inspection.inspectionDate || '',
      invoiceNumber: inspection.invoiceNumber || '',
      committeeReport: inspection.committeeReport || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu muayene kaydını silmek istediğinizden emin misiniz?')) {
      deleteInspection.mutate(id)
    }
  }

  const handleStatusChange = (id: number, status: InspectionStatus) => {
    updateStatus.mutate({ id, status })
  }

  const onSubmit = (data: InspectionFormData) => {
    if (selectedInspection) {
      const { supplierId, ...updateData } = data
      updateInspection.mutate(
        { id: selectedInspection.id, data: updateData },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createInspection.mutate(
        { ...data, tenderId },
        { onSuccess: () => setDialogOpen(false) }
      )
    }
  }

  const columns: GridColDef<InspectionResponse>[] = [
    { field: 'supplierName', headerName: 'Tedarikçi', flex: 1.5 },
    { field: 'reportNumber', headerName: 'Rapor No', width: 130 },
    { field: 'inspectionDate', headerName: 'Muayene Tarihi', width: 130 },
    { field: 'invoiceNumber', headerName: 'Fatura No', width: 130 },
    {
      field: 'status',
      headerName: 'Durum',
      width: 120,
      renderCell: (params) => {
        if (!params.value) return '-'
        return (
          <Chip
            label={inspectionStatusLabels[params.value as InspectionStatus]}
            color={params.value === InspectionStatus.ACCEPTED ? 'success' : 'error'}
            size="small"
          />
        )
      },
    },
    {
      field: 'statusActions',
      headerName: 'Kabul/Red',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            size="small"
            variant={params.row.status === InspectionStatus.ACCEPTED ? 'contained' : 'outlined'}
            color="success"
            onClick={() => handleStatusChange(params.row.id, InspectionStatus.ACCEPTED)}
            sx={{ minWidth: 60, fontSize: '0.7rem' }}
          >
            Kabul
          </Button>
          <Button
            size="small"
            variant={params.row.status === InspectionStatus.REJECTED ? 'contained' : 'outlined'}
            color="error"
            onClick={() => handleStatusChange(params.row.id, InspectionStatus.REJECTED)}
            sx={{ minWidth: 50, fontSize: '0.7rem' }}
          >
            Red
          </Button>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ]

  const isMutating = createInspection.isPending || updateInspection.isPending

  return (
    <Box>
      {items.length > 0 && (
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
            İhale Kalemleri:
          </Typography>
          {items.map((item: TenderItemResponse) => (
            <Chip
              key={item.id}
              label={`${item.itemName} (${item.quantity} ${unitTypeLabels[item.unit]})`}
              size="small"
              variant="outlined"
            />
          ))}
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Muayene Kaydı Ekle
        </Button>
      </Box>

      <DataGrid
        rows={inspections}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {selectedInspection ? 'Muayene Kaydı Düzenle' : 'Yeni Muayene Kaydı'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            {!selectedInspection && (
              <TextField
                label="Tedarikçi"
                select
                fullWidth
                defaultValue=""
                {...register('supplierId')}
                error={!!errors.supplierId}
                helperText={errors.supplierId?.message}
              >
                {suppliers.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.companyName}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              label="Rapor Numarası"
              fullWidth
              {...register('reportNumber')}
            />
            <TextField
              label="Muayene Tarihi"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register('inspectionDate')}
            />
            <TextField
              label="Fatura Numarası"
              fullWidth
              {...register('invoiceNumber')}
            />
            <TextField
              label="Komisyon Raporu"
              fullWidth
              multiline
              rows={3}
              {...register('committeeReport')}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={isMutating}>
              İptal
            </Button>
            <Button type="submit" variant="contained" disabled={isMutating}>
              {isMutating ? <CircularProgress size={24} /> : selectedInspection ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
