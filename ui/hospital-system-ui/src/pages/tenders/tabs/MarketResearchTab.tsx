import { useState } from 'react'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { useTenderItems } from '@/hooks/useTenderItemQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { TenderItemResponse } from '@/types'
import { unitTypeLabels } from '@/constants/labels'
import { formatCurrency } from '@/utils/format'
import MarketResearchItemPanel from './MarketResearchItemPanel'
import ReportDialog, { ReportField } from '@/components/reports/ReportDialog'
import { reportService } from '@/services/report.service'
import { downloadPdf } from '@/utils/fileDownload'

interface MarketResearchTabProps {
  tenderId: number
}

export default function MarketResearchTab({ tenderId }: MarketResearchTabProps) {
  const { data: items = [], isLoading: itemsLoading } = useTenderItems(tenderId)
  const { data: suppliers = [] } = useSuppliers()
  const { enqueueSnackbar } = useSnackbar()

  const [reportMenuAnchor, setReportMenuAnchor] = useState<null | HTMLElement>(null)
  const [reportDialogType, setReportDialogType] = useState<string | null>(null)
  const [yaklasikLoading, setYaklasikLoading] = useState(false)

  const handleYaklasikMaliyet = async () => {
    setReportMenuAnchor(null)
    setYaklasikLoading(true)
    try {
      const blob = await reportService.generateYaklasikMaliyet(tenderId)
      downloadPdf(blob, 'yaklasik-maliyet.pdf')
      enqueueSnackbar('Rapor başarıyla oluşturuldu', { variant: 'success' })
    } catch {
      enqueueSnackbar('Rapor oluşturulurken hata oluştu', { variant: 'error' })
    } finally {
      setYaklasikLoading(false)
    }
  }

  const piyasaArastirmaFields: ReportField[] = [
    { name: 'reportNumber', label: 'Tutanak No', type: 'text', required: true },
    { name: 'reportDate', label: 'Tarih', type: 'date', required: true },
  ]

  if (itemsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (items.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 1 }}>
        Henüz kalem eklenmemiştir. Önce &apos;Kalemler&apos; sekmesinden kalem ekleyiniz.
      </Alert>
    )
  }

  const defaultExpanded = items.length <= 3

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={yaklasikLoading ? <CircularProgress size={18} /> : <DescriptionIcon />}
          onClick={(e) => setReportMenuAnchor(e.currentTarget)}
          disabled={yaklasikLoading}
        >
          Rapor Oluştur
        </Button>
        <Menu
          anchorEl={reportMenuAnchor}
          open={Boolean(reportMenuAnchor)}
          onClose={() => setReportMenuAnchor(null)}
        >
          <MenuItem onClick={handleYaklasikMaliyet}>
            Yaklaşık Maliyet Cetveli
          </MenuItem>
          <MenuItem
            onClick={() => {
              setReportMenuAnchor(null)
              setReportDialogType('piyasa')
            }}
          >
            Piyasa Araştırma Tutanağı
          </MenuItem>
        </Menu>
      </Box>

      {items.map((item: TenderItemResponse) => (
        <Accordion key={item.id} defaultExpanded={defaultExpanded} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', pr: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.itemName}
              </Typography>
              <Chip
                label={`${item.quantity} ${unitTypeLabels[item.unit]}`}
                size="small"
                variant="outlined"
              />
              {item.approximateUnitCost != null && (
                <Chip
                  label={`Yaklaşık: ${formatCurrency(item.approximateUnitCost)}`}
                  size="small"
                  color="info"
                  variant="outlined"
                />
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Chip
                label={`${item.marketResearchOfferCount} teklif`}
                size="small"
                color={item.marketResearchOfferCount > 0 ? 'primary' : 'default'}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <MarketResearchItemPanel item={item} suppliers={suppliers} />
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Report Dialog */}
      <ReportDialog
        open={reportDialogType === 'piyasa'}
        onClose={() => setReportDialogType(null)}
        title="Piyasa Araştırma Tutanağı"
        fields={piyasaArastirmaFields}
        onGenerate={(values) => reportService.generatePiyasaArastirmaTutanagi(tenderId, values)}
        fileName="piyasa-arastirma-tutanagi.pdf"
      />
    </Box>
  )
}
