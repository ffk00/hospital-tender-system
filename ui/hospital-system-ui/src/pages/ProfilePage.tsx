import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/hooks/useUserQueries'
import { useTenderCommissionsByUser } from '@/hooks/useTenderCommissionQueries'
import { userRoleLabels, commissionRoleLabels } from '@/constants/labels'

export default function ProfilePage() {
  const { user: authUser } = useAuth()
  const navigate = useNavigate()

  const userId = authUser?.userId ?? 0
  const { data: user, isLoading: userLoading } = useUser(userId)
  const { data: commissions = [], isLoading: commissionsLoading } = useTenderCommissionsByUser(userId)

  if (userLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Profil</Typography>

      {/* Kullanici Bilgileri */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h6">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            {user?.title && (
              <Typography variant="body2" color="text.secondary">
                {user.title}
              </Typography>
            )}
            {user?.role && (
              <Chip
                label={userRoleLabels[user.role]}
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Box>
      </Paper>

      {/* Gorev Aldigi Ihaleler */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">Gorev Aldigi Ihaleler</Typography>
          <Chip label={commissions.length} size="small" color="default" />
        </Box>
        {commissionsLoading ? (
          <CircularProgress size={24} />
        ) : commissions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Henuz komisyon gorevlendirmesi bulunmamaktadir.
          </Typography>
        ) : (
          <List disablePadding>
            {commissions.map((c) => (
              <ListItemButton
                key={c.id}
                onClick={() => navigate(`/tenders/${c.tenderId}?tab=3`)}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemText
                  primary={c.tenderTitle}
                  secondary={`Ihale #${c.tenderId}`}
                />
                <Chip
                  label={commissionRoleLabels[c.role]}
                  size="small"
                  color={c.role === 'PRESIDENT' ? 'warning' : 'default'}
                  variant="outlined"
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}
