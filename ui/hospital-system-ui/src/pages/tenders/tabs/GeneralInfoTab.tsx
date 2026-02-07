import { Box, Typography, Grid, Paper, Divider } from '@mui/material'
import { TenderResponse } from '@/types'
import { formatDate, formatDateTime } from '@/utils/format'

interface GeneralInfoTabProps {
  tender: TenderResponse
}

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
  )
}

export default function GeneralInfoTab({ tender }: GeneralInfoTabProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Temel Bilgiler
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <InfoField label="İhale Başlığı" value={tender.title} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="İKN (Kayıt No)" value={tender.registrationNumber} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InfoField label="Açıklama" value={tender.description} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InfoField label="Onay Numarası" value={tender.approvalNumber} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <InfoField label="Kalem Sayısı" value={String(tender.itemCount)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <InfoField label="Komisyon Üye Sayısı" value={String(tender.commissionMemberCount)} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Tarihler
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="Onay Tarihi" value={formatDate(tender.approvalDate)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="Piyasa Araştırma Tarihi" value={formatDate(tender.marketResearchDate)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="İhale Tarihi" value={formatDateTime(tender.tenderDate)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="Sözleşme Tarihi" value={formatDate(tender.contractDate)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <InfoField label="Sözleşme Bitiş Tarihi" value={formatDate(tender.contractEndDate)} />
        </Grid>
      </Grid>
    </Paper>
  )
}
