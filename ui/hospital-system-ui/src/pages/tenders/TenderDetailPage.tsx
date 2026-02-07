import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Tab,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ArrowBack as BackIcon } from '@mui/icons-material'
import { useTender } from '@/hooks/useTenderQueries'
import { tenderStatusLabels, tenderStatusColors, tenderMethodLabels } from '@/constants/labels'
import GeneralInfoTab from './tabs/GeneralInfoTab'
import ItemsTab from './tabs/ItemsTab'
import CommissionTab from './tabs/CommissionTab'
import MarketResearchTab from './tabs/MarketResearchTab'
import OfficialBidsTab from './tabs/OfficialBidsTab'
import InspectionTab from './tabs/InspectionTab'

export default function TenderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState('1')

  const tenderId = Number(id)
  const { data: tender, isLoading, error } = useTender(tenderId)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !tender) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        İhale bulunamadı
      </Alert>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/tenders')}
          sx={{ mb: 1 }}
        >
          İhalelere Dön
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h5">{tender.title}</Typography>
          <Chip
            label={tenderStatusLabels[tender.status]}
            color={tenderStatusColors[tender.status]}
            size="small"
          />
          <Chip
            label={tenderMethodLabels[tender.method]}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <TabList onChange={(_, v) => setTabValue(v)}>
            <Tab label="Genel Bilgiler" value="1" />
            <Tab label="Kalemler" value="2" />
            <Tab label="Komisyon" value="3" />
            <Tab label="Piyasa Araştırması" value="4" />
            <Tab label="Teklifler" value="5" />
            <Tab label="Muayene" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <GeneralInfoTab tender={tender} />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <ItemsTab tenderId={tenderId} />
        </TabPanel>
        <TabPanel value="3" sx={{ p: 0 }}>
          <CommissionTab tenderId={tenderId} />
        </TabPanel>
        <TabPanel value="4" sx={{ p: 0 }}>
          <MarketResearchTab tenderId={tenderId} />
        </TabPanel>
        <TabPanel value="5" sx={{ p: 0 }}>
          <OfficialBidsTab tenderId={tenderId} />
        </TabPanel>
        <TabPanel value="6" sx={{ p: 0 }}>
          <InspectionTab tenderId={tenderId} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
