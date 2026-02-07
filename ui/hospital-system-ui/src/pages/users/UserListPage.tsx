import { useState } from 'react'
import { Box, Button, Typography, IconButton, Chip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/useUserQueries'
import { UserResponse, UserRole, CreateUserRequest, UpdateUserRequest } from '@/types'
import UserFormDialog from './UserFormDialog'

const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Yönetici',
  [UserRole.USER]: 'Kullanıcı',
  [UserRole.COMMISSIONER]: 'Komisyon Üyesi',
}

const roleColors: Record<UserRole, 'primary' | 'default' | 'secondary'> = {
  [UserRole.ADMIN]: 'primary',
  [UserRole.USER]: 'default',
  [UserRole.COMMISSIONER]: 'secondary',
}

export default function UserListPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)

  const { data: users = [], isLoading } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const handleCreate = () => {
    setSelectedUser(null)
    setDialogOpen(true)
  }

  const handleEdit = (user: UserResponse) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      deleteUser.mutate(id)
    }
  }

  const handleSubmit = (data: CreateUserRequest | UpdateUserRequest) => {
    if (selectedUser) {
      updateUser.mutate(
        { id: selectedUser.id, data: data as UpdateUserRequest },
        { onSuccess: () => setDialogOpen(false) }
      )
    } else {
      createUser.mutate(data as CreateUserRequest, {
        onSuccess: () => setDialogOpen(false),
      })
    }
  }

  const columns: GridColDef<UserResponse>[] = [
    { field: 'firstName', headerName: 'Ad', flex: 1 },
    { field: 'lastName', headerName: 'Soyad', flex: 1 },
    { field: 'title', headerName: 'Ünvan', flex: 1 },
    { field: 'email', headerName: 'E-posta', flex: 1.5 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={roleLabels[params.value as UserRole]}
          color={roleColors[params.value as UserRole]}
          size="small"
        />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Durum',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Aktif' : 'Pasif'}
          color={params.value ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Kullanıcılar</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Yeni Kullanıcı
        </Button>
      </Box>

      <DataGrid
        rows={users}
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

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        user={selectedUser}
        isLoading={createUser.isPending || updateUser.isPending}
      />
    </Box>
  )
}
