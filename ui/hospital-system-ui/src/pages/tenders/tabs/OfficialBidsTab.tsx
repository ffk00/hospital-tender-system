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
  Typography,
  Chip,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Gavel as EvaluateIcon,
} from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useOfficialBids,
  useCreateOfficialBid,
  useDeleteOfficialBid,
  useEvaluateBids,
} from '@/hooks/useOfficialBidQueries'
import { useTenderItems } from '@/hooks/useTenderItemQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { OfficialBidResponse, TenderItemResponse } from '@/types'
import { formatCurrency } from '@/utils/format'

const bidSchema = z.object({
  tenderItemId: z.coerce.number().min(1, 'Kalem seçiniz'),
  supplierId: z.coerce.number().min(1, 'Tedarikçi seçiniz'),
  bidPrice: z.coerce.number().min(0.01, 'Fiyat giriniz'),
})

type BidFormData = z.infer<typeof bidSchema>

interface OfficialBidsTabProps {
  tenderId: number
}

export default function OfficialBidsTab({ tenderId }: OfficialBidsTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number>(0)

  const { data: items = [] } = useTenderItems(tenderId)
  const { data: suppliers = [] } = useSuppliers()
  const { data: bids = [], isLoading } = useOfficialBids(selectedItemId)
  const createBid = useCreateOfficialBid(selectedItemId)
  const deleteBid = useDeleteOfficialBid(selectedItemId)
  const evaluateBids = useEvaluateBids(selectedItemId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BidFormData>({
    resolver: zodResolver(bidSchema),
  })

  const handleCreate = () => {
    reset({ tenderItemId: selectedItemId, supplierId: 0, bidPrice: 0 })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu teklifi silmek istediğinizden emin misiniz?')) {
      deleteBid.mutate(id)
    }
  }

  const handleEvaluate = () => {
    if (window.confirm('Teklifleri değerlendirmek istediğinizden emin misiniz? Tavan fiyatı aşan teklifler reddedilecek ve en düşük geçerli teklif kazanan olarak seçilecektir.')) {
      evaluateBids.mutate()
    }
  }

  const onSubmit = (data: BidFormData) => {
    createBid.mutate(data, { onSuccess: () => setDialogOpen(false) })
  }

  const selectedItem = items.find((i: TenderItemResponse) => i.id === selectedItemId)

  const columns: GridColDef<OfficialBidResponse>[] = [
    { field: 'supplierName', headerName: 'Tedarikçi', flex: 1.5 },
    {
      field: 'bidPrice',
      headerName: 'Teklif Fiyatı',
      width: 140,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => formatCurrency(params.value),
    },
    {
      field: 'isValid',
      headerName: 'Geçerli',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Evet' : 'Hayır'}
          color={params.value ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'isWinningBid',
      headerName: 'Kazanan',
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Kazanan" color="success" size="small" />
        ) : null,
    },
    { field: 'rejectionReason', headerName: 'Red Sebebi', flex: 1 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <TextField
          label="Kalem Seçiniz"
          select
          size="small"
          sx={{ minWidth: 300 }}
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(Number(e.target.value))}
        >
          <MenuItem value={0} disabled>Kalem seçiniz</MenuItem>
          {items.map((item: TenderItemResponse) => (
            <MenuItem key={item.id} value={item.id}>
              {item.itemName}
            </MenuItem>
          ))}
        </TextField>
        {selectedItem && selectedItem.approximateUnitCost != null && (
          <Typography variant="body2" color="text.secondary">
            Tavan Fiyat: <strong>{formatCurrency(selectedItem.approximateUnitCost)}</strong>
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          color="warning"
          startIcon={<EvaluateIcon />}
          onClick={handleEvaluate}
          disabled={!selectedItemId || evaluateBids.isPending}
        >
          Değerlendir
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          disabled={!selectedItemId}
        >
          Teklif Ekle
        </Button>
      </Box>

      {selectedItemId ? (
        <DataGrid
          rows={bids}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          autoHeight
          sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
        />
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          Teklifleri görüntülemek için bir kalem seçiniz
        </Typography>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Yeni Resmi Teklif</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label="Kalem"
              select
              fullWidth
              defaultValue={selectedItemId}
              {...register('tenderItemId')}
              error={!!errors.tenderItemId}
              helperText={errors.tenderItemId?.message}
            >
              {items.map((item: TenderItemResponse) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.itemName}
                </MenuItem>
              ))}
            </TextField>
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
            <TextField
              label="Teklif Fiyatı (₺)"
              type="number"
              fullWidth
              {...register('bidPrice')}
              error={!!errors.bidPrice}
              helperText={errors.bidPrice?.message}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={createBid.isPending}>
              İptal
            </Button>
            <Button type="submit" variant="contained" disabled={createBid.isPending}>
              {createBid.isPending ? <CircularProgress size={24} /> : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
