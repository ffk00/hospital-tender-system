import { Box, Typography, Paper, Grid, Chip, List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import { useAuth } from '@/context/AuthContext'
import { useTenders } from '@/hooks/useTenderQueries'
import { useFavoriteTenders } from '@/hooks/useFavoriteTenders'
import { TenderStatus } from '@/types'
import { tenderStatusLabels, tenderStatusColors } from '@/constants/labels'
import { formatDate } from '@/utils/format'

interface QuickLinkProps {
  title: string
  description: string
  icon: React.ReactNode
  path: string
}

function QuickLink({ title, description, icon, path }: QuickLinkProps) {
  const navigate = useNavigate()

  return (
    <Paper
      sx={{
        p: 3,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      onClick={() => navigate(path)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: tenders = [] } = useTenders()
  const { favoriteIds } = useFavoriteTenders()

  const favoriteTenders = tenders.filter((t) => favoriteIds.includes(t.id))
  const activeTenders = tenders.filter(
    (t) => t.status !== TenderStatus.COMPLETED && t.status !== TenderStatus.CANCELLED,
  )

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hos Geldiniz, {user?.fullName}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Hastane Ihale Yonetim Sistemine hosgeldiniz.
      </Typography>

      {/* Favori Ihaleler */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <StarIcon color="warning" />
          <Typography variant="h6">Favori Ihaleler</Typography>
        </Box>
        {favoriteTenders.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Henuz favori ihale eklemediniz.
          </Typography>
        ) : (
          <List disablePadding>
            {favoriteTenders.map((tender) => (
              <ListItemButton
                key={tender.id}
                onClick={() => navigate(`/tenders/${tender.id}`)}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemText
                  primary={tender.title}
                  secondary={formatDate(tender.tenderDate)}
                />
                <Chip
                  label={tenderStatusLabels[tender.status]}
                  color={tenderStatusColors[tender.status]}
                  size="small"
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>

      {/* Aktif Ihaleler */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AssignmentIcon color="primary" />
          <Typography variant="h6">Aktif Ihaleler</Typography>
        </Box>
        {activeTenders.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aktif ihale bulunmamaktadir.
          </Typography>
        ) : (
          <List disablePadding>
            {activeTenders.map((tender) => (
              <ListItemButton
                key={tender.id}
                onClick={() => navigate(`/tenders/${tender.id}`)}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemText
                  primary={tender.title}
                  secondary={formatDate(tender.tenderDate)}
                />
                <Chip
                  label={tenderStatusLabels[tender.status]}
                  color={tenderStatusColors[tender.status]}
                  size="small"
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>

      {/* Hizli Erisim */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hizli Erisim
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickLink
            title="Kullanicilar"
            description="Kullanici yonetimi"
            icon={<PeopleIcon />}
            path="/users"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickLink
            title="Tedarikciler"
            description="Tedarikci yonetimi"
            icon={<BusinessIcon />}
            path="/suppliers"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickLink
            title="Ihaleler"
            description="Ihale yonetimi"
            icon={<AssignmentIcon />}
            path="/tenders"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
