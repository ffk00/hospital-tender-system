import { Box, Typography, Paper, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material'

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
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hos Geldiniz
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Hastane Ihale Yonetim Sistemine hosgeldiniz. Asagidaki baglantilari
        kullanarak islemlerinizi gerceklestirebilirsiniz.
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
