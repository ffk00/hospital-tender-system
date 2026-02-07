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
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useTenderCommissions,
  useCreateTenderCommission,
  useDeleteTenderCommission,
} from '@/hooks/useTenderCommissionQueries'
import { useUsers } from '@/hooks/useUserQueries'
import { TenderCommissionResponse, CommissionRole } from '@/types'
import { commissionRoleLabels } from '@/constants/labels'

const commissionSchema = z.object({
  userId: z.coerce.number().min(1, 'Kullanıcı seçiniz'),
  role: z.nativeEnum(CommissionRole, { message: 'Rol seçiniz' }),
})

type CommissionFormData = z.infer<typeof commissionSchema>

interface CommissionTabProps {
  tenderId: number
}

export default function CommissionTab({ tenderId }: CommissionTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data: members = [], isLoading } = useTenderCommissions(tenderId)
  const { data: users = [] } = useUsers()
  const createMember = useCreateTenderCommission(tenderId)
  const deleteMember = useDeleteTenderCommission(tenderId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommissionFormData>({
    resolver: zodResolver(commissionSchema),
  })

  const handleCreate = () => {
    reset({ userId: 0, role: CommissionRole.MEMBER })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu üyeyi komisyondan çıkarmak istediğinizden emin misiniz?')) {
      deleteMember.mutate(id)
    }
  }

  const onSubmit = (data: CommissionFormData) => {
    createMember.mutate(
      { ...data, tenderId },
      { onSuccess: () => setDialogOpen(false) }
    )
  }

  const columns: GridColDef<TenderCommissionResponse>[] = [
    { field: 'userFullName', headerName: 'Ad Soyad', flex: 1.5 },
    { field: 'userTitle', headerName: 'Ünvan', flex: 1 },
    {
      field: 'role',
      headerName: 'Komisyon Rolü',
      width: 150,
      renderCell: (params) => commissionRoleLabels[params.value as CommissionRole],
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 100,
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Üye Ekle
        </Button>
      </Box>

      <DataGrid
        rows={members}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
        sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Komisyon Üyesi Ekle</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            <TextField
              label="Kullanıcı"
              select
              fullWidth
              defaultValue=""
              {...register('userId')}
              error={!!errors.userId}
              helperText={errors.userId?.message}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} {user.title ? `- ${user.title}` : ''}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Komisyon Rolü"
              select
              fullWidth
              defaultValue={CommissionRole.MEMBER}
              {...register('role')}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              {Object.values(CommissionRole).map((role) => (
                <MenuItem key={role} value={role}>
                  {commissionRoleLabels[role]}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={createMember.isPending}>
              İptal
            </Button>
            <Button type="submit" variant="contained" disabled={createMember.isPending}>
              {createMember.isPending ? <CircularProgress size={24} /> : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}
