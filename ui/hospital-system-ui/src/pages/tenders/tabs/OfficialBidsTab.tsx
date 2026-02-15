import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useTenderItems } from '@/hooks/useTenderItemQueries'
import { useSuppliers } from '@/hooks/useSupplierQueries'
import { TenderItemResponse } from '@/types'
import { unitTypeLabels } from '@/constants/labels'
import { formatCurrency } from '@/utils/format'
import OfficialBidsItemPanel from './OfficialBidsItemPanel'

interface OfficialBidsTabProps {
  tenderId: number
}

export default function OfficialBidsTab({ tenderId }: OfficialBidsTabProps) {
  const { data: items = [], isLoading: itemsLoading } = useTenderItems(tenderId)
  const { data: suppliers = [] } = useSuppliers()

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
                  label={`Tavan: ${formatCurrency(item.approximateUnitCost)}`}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Chip
                label={`${item.officialBidCount} teklif`}
                size="small"
                color={item.officialBidCount > 0 ? 'primary' : 'default'}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <OfficialBidsItemPanel item={item} suppliers={suppliers} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
