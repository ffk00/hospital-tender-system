import dayjs from 'dayjs'

export function formatDate(value: string | null | undefined): string {
  if (!value) return '-'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('DD.MM.YYYY') : value
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '-'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('DD.MM.YYYY HH:mm') : value
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '-'
  return `₺${value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
