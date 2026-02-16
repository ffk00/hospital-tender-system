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
  Menu,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod/v4'
import { z } from 'zod'
import {
  useTenderItems,
  useCreateTenderItem,
  useUpdateTenderItem,
  useDeleteTenderItem,
} from '@/hooks/useTenderItemQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { TenderItemResponse, UnitType } from '@/types'
import { unitTypeLabels } from '@/constants/labels'
import { formatCurrency } from '@/utils/format'
import ReportDialog, { ReportField } from '@/components/reports/ReportDialog'
import { reportService } from '@/services/report.service'

const itemSchema = z.object({
  itemName: z.string().min(1, 'Kalem adı gereklidir'),
  quantity: z.coerce.number().min(0.01, 'Miktar giriniz'),
  unit: z.nativeEnum(UnitType, { message: 'Birim seçiniz' }),
  specifications: z.string().optional(),
})

type ItemFormData = z.infer<typeof itemSchema>

interface ItemsTabProps {
  tenderId: number
}

export default function ItemsTab({ tenderId }: ItemsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TenderItemResponse | null>(null)
  const [reportMenuAnchor, setReportMenuAnchor] = useState<null | HTMLElement>(null)
  const [reportDialogType, setReportDialogType] = useState<string | null>(null)

  const { data: items = [], isLoading } = useTenderItems(tenderId)
  const { data: suppliers = [] } = useSuppliers()
  const createItem = useCreateTenderItem(tenderId)
  const updateItem = useUpdateTenderItem(tenderId)
  const deleteItem = useDeleteTenderItem(tenderId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  })

  const handleCreate = () => {
    setSelectedItem(null)
    reset({ itemName: '', quantity: 0, unit: UnitType.PIECE, specifications: '' })
    setDialogOpen(true)
  }

  const handleEdit = (item: TenderItemResponse) => {
    setSelectedItem(item)
    reset({
      itemName: item.itemName,
      quantity: item.quantity,
      unit: item.unit,
      specifications: item.specifications || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu kalemi silmek istediğinizden emin misiniz?')) {
      deleteItem.mutate(id)
    }
  }

  const onSubmit = (data: ItemFormData) => {
    if (selectedItem) {
      updateItem.mutate(
        { id: selectedItem.id, data },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createItem.mutate(
        { ...data, tenderId },
        { onSuccess: () => setDialogOpen(false) }
      )
    }
  }

  const columns: GridColDef<TenderItemResponse>[] = [
    { field: 'itemName', headerName: 'Kalem Adı', flex: 2 },
    { field: 'quantity', headerName: 'Miktar', width: 100, align: 'right', headerAlign: 'right' },
    {
      field: 'unit',
      headerName: 'Birim',
      width: 100,
      renderCell: (params) => unitTypeLabels[params.value as UnitType],
    },
    {
      field: 'approximateUnitCost',
      headerName: 'Yaklaşık Maliyet',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => formatCurrency(params.value),
    },
    { field: 'specifications', headerName: 'Teknik Şartname', flex: 1 },
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

  const isMutating = createItem.isPending || updateItem.isPending

  // Report field configs
  const luzumFields: ReportField[] = [
    { name: 'documentNumber', label: 'Belge No', type: 'text', required: true },
    { name: 'documentDate', label: 'Tarih', type: 'date', required: true },
    { name: 'requestSubject', label: 'Talep Konusu', type: 'text' },
    { name: 'serviceManager1', label: 'Servis Sorumlusu 1', type: 'text' },
    { name: 'serviceManager2', label: 'Servis Sorumlusu 2', type: 'text' },
    { name: 'pharmacistName', label: 'Eczacı Adı', type: 'text' },
    { name: 'warehouseManagerName', label: 'Depo Sorumlusu', type: 'text' },
    { name: 'adminManagerName', label: 'İdari Mali İşler Müdürü', type: 'text' },
    { name: 'chiefPhysicianName', label: 'Başhekim', type: 'text' },
  ]

  const teklifFields: ReportField[] = [
    { name: 'documentNumber', label: 'Belge No', type: 'text', required: true },
    {
      name: 'supplierId',
      label: 'Tedarikçi',
      type: 'select',
      required: true,
      options: suppliers.map((s) => ({ value: s.id, label: s.companyName })),
    },
    { name: 'chiefPhysicianName', label: 'Başhekim', type: 'text' },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<DescriptionIcon />}
          onClick={(e) => setReportMenuAnchor(e.currentTarget)}
        >
          Rapor Oluştur
        </Button>
        <Menu
          anchorEl={reportMenuAnchor}
          open={Boolean(reportMenuAnchor)}
          onClose={() => setReportMenuAnchor(null)}
        >
          <MenuItem
            onClick={() => {
              setReportMenuAnchor(null)
              setReportDialogType('luzum')
            }}
          >
            Lüzum Müzekkeresi
          </MenuItem>
          <MenuItem
            onClick={() => {
              setReportMenuAnchor(null)
              setReportDialogType('teklif')
            }}
          >
            Teklif Mektubu
          </MenuItem>
        </Menu>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Kalem Ekle
        </Button>
      </Box>

      <DataGrid
        rows={items}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        autoHeight
        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{selectedItem ? 'Kalem Düzenle' : 'Yeni Kalem'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label="Kalem Adı"
              fullWidth
              {...register('itemName')}
              error={!!errors.itemName}
              helperText={errors.itemName?.message}
            />
            <TextField
              label="Miktar"
              type="number"
              fullWidth
              {...register('quantity')}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
            <TextField
              label="Birim"
              select
              fullWidth
              defaultValue={selectedItem?.unit || UnitType.PIECE}
              {...register('unit')}
              error={!!errors.unit}
              helperText={errors.unit?.message}
            >
              {Object.values(UnitType).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unitTypeLabels[unit]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Teknik Şartname"
              fullWidth
              multiline
              rows={2}
              {...register('specifications')}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={isMutating}>
              İptal
            </Button>
            <Button type="submit" variant="contained" disabled={isMutating}>
              {isMutating ? <CircularProgress size={24} /> : selectedItem ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Report Dialogs */}
      <ReportDialog
        open={reportDialogType === 'luzum'}
        onClose={() => setReportDialogType(null)}
        title="Lüzum Müzekkeresi"
        fields={luzumFields}
        onGenerate={(values) => reportService.generateLuzumMuzekkeresi(tenderId, values)}
        fileName="luzum-muzekkeresi.pdf"
      />
      <ReportDialog
        open={reportDialogType === 'teklif'}
        onClose={() => setReportDialogType(null)}
        title="Teklif Mektubu"
        fields={teklifFields}
        onGenerate={(values) => reportService.generateTeklifMektubu(tenderId, values)}
        fileName="teklif-mektubu.pdf"
      />
    </Box>
  )
}
