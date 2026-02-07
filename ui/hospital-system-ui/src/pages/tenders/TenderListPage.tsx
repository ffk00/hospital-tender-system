import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, IconButton, Chip, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useTenders, useCreateTender, useUpdateTender, useDeleteTender } from '@/hooks/useTenderQueries'
import { TenderResponse, TenderMethod, TenderStatus, CreateTenderRequest, UpdateTenderRequest } from '@/types'
import { tenderMethodLabels, tenderStatusLabels, tenderStatusColors } from '@/constants/labels'
import { formatDate } from '@/utils/format'
import TenderFormDialog from './TenderFormDialog'

export default function TenderListPage() {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTender, setSelectedTender] = useState<TenderResponse | null>(null)

  const { data: tenders = [], isLoading } = useTenders()
  const createTender = useCreateTender()
  const updateTender = useUpdateTender()
  const deleteTender = useDeleteTender()

  const handleCreate = () => {
    setSelectedTender(null)
    setDialogOpen(true)
  }

  const handleEdit = (e: React.MouseEvent, tender: TenderResponse) => {
    e.stopPropagation()
    setSelectedTender(tender)
    setDialogOpen(true)
  }

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (window.confirm('Bu ihaleyi silmek istediğinizden emin misiniz?')) {
      deleteTender.mutate(id)
    }
  }

  const handleSubmit = (data: CreateTenderRequest | UpdateTenderRequest) => {
    if (selectedTender) {
      updateTender.mutate(
        { id: selectedTender.id, data: data as UpdateTenderRequest },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createTender.mutate(data as CreateTenderRequest, {
        onSuccess: () => setDialogOpen(false),
      })
    }
  }

  const columns: GridColDef<TenderResponse>[] = [
    {
      field: 'title',
      headerName: 'İhale Başlığı',
      flex: 2,
    },
    {
      field: 'method',
      headerName: 'Usul',
      width: 150,
      renderCell: (params) => tenderMethodLabels[params.value as TenderMethod],
    },
    {
      field: 'status',
      headerName: 'Durum',
      width: 160,
      renderCell: (params) => (
        <Chip
          label={tenderStatusLabels[params.value as TenderStatus]}
          color={tenderStatusColors[params.value as TenderStatus]}
          size="small"
        />
      ),
    },
    {
      field: 'tenderDate',
      headerName: 'İhale Tarihi',
      width: 130,
      renderCell: (params) => formatDate(params.value),
    },
    { field: 'itemCount', headerName: 'Kalem', width: 80, align: 'center', headerAlign: 'center' },
    { field: 'registrationNumber', headerName: 'İKN', width: 140 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Düzenle">
            <IconButton size="small" onClick={(e) => handleEdit(e, params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sil">
            <IconButton size="small" color="error" onClick={(e) => handleDelete(e, params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">İhaleler</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Yeni İhale
        </Button>
      </Box>

      <DataGrid
        rows={tenders}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        autoHeight
        onRowClick={(params) => navigate(`/tenders/${params.row.id}`)}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          cursor: 'pointer',
          '& .MuiDataGrid-row:hover': {
            bgcolor: 'action.hover',
          },
        }}
      />

      <TenderFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        tender={selectedTender}
        isLoading={createTender.isPending || updateTender.isPending}
      />
    </Box>
  )
}
