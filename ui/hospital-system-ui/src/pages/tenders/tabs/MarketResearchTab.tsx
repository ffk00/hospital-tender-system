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
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useMarketResearchOffers,
  useCreateMarketResearchOffer,
  useUpdateMarketResearchOffer,
  useDeleteMarketResearchOffer,
} from '@/hooks/useMarketResearchOfferQueries'
import { useTenderItems } from '@/hooks/useTenderItemQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { MarketResearchOfferResponse, TenderItemResponse } from '@/types'
import { formatCurrency } from '@/utils/format'

const offerSchema = z.object({
  tenderItemId: z.coerce.number().min(1, 'Kalem seçiniz'),
  supplierId: z.coerce.number().min(1, 'Tedarikçi seçiniz'),
  offeredPrice: z.coerce.number().min(0.01, 'Fiyat giriniz'),
  offerDate: z.string().optional(),
  notes: z.string().optional(),
})

type OfferFormData = z.infer<typeof offerSchema>

interface MarketResearchTabProps {
  tenderId: number
}

export default function MarketResearchTab({ tenderId }: MarketResearchTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<MarketResearchOfferResponse | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<number>(0)

  const { data: items = [] } = useTenderItems(tenderId)
  const { data: suppliers = [] } = useSuppliers()
  const { data: offers = [], isLoading } = useMarketResearchOffers(selectedItemId)
  const createOffer = useCreateMarketResearchOffer(selectedItemId)
  const updateOffer = useUpdateMarketResearchOffer(selectedItemId)
  const deleteOffer = useDeleteMarketResearchOffer(selectedItemId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
  })

  const handleItemChange = (itemId: number) => {
    setSelectedItemId(itemId)
  }

  const handleCreate = () => {
    setSelectedOffer(null)
    reset({
      tenderItemId: selectedItemId,
      supplierId: 0,
      offeredPrice: 0,
      offerDate: '',
      notes: '',
    })
    setDialogOpen(true)
  }

  const handleEdit = (offer: MarketResearchOfferResponse) => {
    setSelectedOffer(offer)
    reset({
      tenderItemId: offer.tenderItemId,
      supplierId: offer.supplierId,
      offeredPrice: offer.offeredPrice,
      offerDate: offer.offerDate || '',
      notes: offer.notes || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu teklifi silmek istediğinizden emin misiniz?')) {
      deleteOffer.mutate(id)
    }
  }

  const onSubmit = (data: OfferFormData) => {
    if (selectedOffer) {
      updateOffer.mutate(
        { id: selectedOffer.id, data: { offeredPrice: data.offeredPrice, offerDate: data.offerDate, notes: data.notes } },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createOffer.mutate(data, { onSuccess: () => setDialogOpen(false) })
    }
  }

  const selectedItem = items.find((i: TenderItemResponse) => i.id === selectedItemId)

  const columns: GridColDef<MarketResearchOfferResponse>[] = [
    { field: 'supplierName', headerName: 'Tedarikçi', flex: 1.5 },
    {
      field: 'offeredPrice',
      headerName: 'Teklif Fiyatı',
      width: 140,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => formatCurrency(params.value),
    },
    { field: 'offerDate', headerName: 'Teklif Tarihi', width: 130 },
    { field: 'notes', headerName: 'Notlar', flex: 1 },
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

  const isMutating = createOffer.isPending || updateOffer.isPending

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <TextField
          label="Kalem Seçiniz"
          select
          size="small"
          sx={{ minWidth: 300 }}
          value={selectedItemId}
          onChange={(e) => handleItemChange(Number(e.target.value))}
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
            Yaklaşık Maliyet: <strong>{formatCurrency(selectedItem.approximateUnitCost)}</strong>
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
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
          rows={offers}
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
          <DialogTitle>{selectedOffer ? 'Teklif Düzenle' : 'Yeni Teklif'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            {!selectedOffer && (
              <>
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
              </>
            )}
            <TextField
              label="Teklif Fiyatı (₺)"
              type="number"
              fullWidth
              {...register('offeredPrice')}
              error={!!errors.offeredPrice}
              helperText={errors.offeredPrice?.message}
            />
            <TextField
              label="Teklif Tarihi"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register('offerDate')}
            />
            <TextField
              label="Notlar"
              fullWidth
              multiline
              rows={2}
              {...register('notes')}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={isMutating}>
              İptal
            </Button>
            <Button type="submit" variant="contained" disabled={isMutating}>
              {isMutating ? <CircularProgress size={24} /> : selectedOffer ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
