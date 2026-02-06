import { useState } from 'react'
import { Box, Button, Typography, IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {
  useSuppliers,
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
} from '@/hooks/useSupplierQueries'
import { SupplierResponse, CreateSupplierRequest, UpdateSupplierRequest } from '@/types'
import SupplierFormDialog from './SupplierFormDialog'

export default function SupplierListPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierResponse | null>(null)

  const { data: suppliers = [], isLoading } = useSuppliers()
  const createSupplier = useCreateSupplier()
  const updateSupplier = useUpdateSupplier()
  const deleteSupplier = useDeleteSupplier()

  const handleCreate = () => {
    setSelectedSupplier(null)
    setDialogOpen(true)
  }

  const handleEdit = (supplier: SupplierResponse) => {
    setSelectedSupplier(supplier)
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu tedarikçiyi silmek istediğinizden emin misiniz?')) {
      deleteSupplier.mutate(id)
    }
  }

  const handleSubmit = (data: CreateSupplierRequest | UpdateSupplierRequest) => {
    if (selectedSupplier) {
      updateSupplier.mutate(
        { id: selectedSupplier.id, data: data as UpdateSupplierRequest },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createSupplier.mutate(data as CreateSupplierRequest, {
        onSuccess: () => setDialogOpen(false),
      })
    }
  }

  const columns: GridColDef<SupplierResponse>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'companyName', headerName: 'Firma Adı', flex: 1.5 },
    { field: 'taxNumber', headerName: 'Vergi No', width: 130 },
    { field: 'contactName', headerName: 'İletişim Kişisi', flex: 1 },
    { field: 'phone', headerName: 'Telefon', width: 140 },
    { field: 'email', headerName: 'E-posta', flex: 1 },
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Tedarikçiler</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Yeni Tedarikçi
        </Button>
      </Box>

      <DataGrid
        rows={suppliers}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      />

      <SupplierFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        supplier={selectedSupplier}
        isLoading={createSupplier.isPending || updateSupplier.isPending}
      />
    </Box>
  )
}
