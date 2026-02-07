import {
  TenderMethod,
  TenderStatus,
  UnitType,
  CommissionRole,
  InspectionStatus,
  UserRole,
} from '@/types'

export const tenderMethodLabels: Record<TenderMethod, string> = {
  [TenderMethod.OPEN_TENDER]: 'Açık İhale',
  [TenderMethod.DIRECT_PROCUREMENT]: 'Doğrudan Temin',
  [TenderMethod.BARGAINING]: 'Pazarlık',
}

export const tenderStatusLabels: Record<TenderStatus, string> = {
  [TenderStatus.DRAFT]: 'Taslak',
  [TenderStatus.MARKET_RESEARCH]: 'Piyasa Araştırması',
  [TenderStatus.PUBLISHED]: 'Yayınlandı',
  [TenderStatus.EVALUATION]: 'Değerlendirme',
  [TenderStatus.COMPLETED]: 'Tamamlandı',
  [TenderStatus.CANCELLED]: 'İptal Edildi',
}

export const tenderStatusColors: Record<TenderStatus, 'default' | 'info' | 'primary' | 'warning' | 'success' | 'error'> = {
  [TenderStatus.DRAFT]: 'default',
  [TenderStatus.MARKET_RESEARCH]: 'info',
  [TenderStatus.PUBLISHED]: 'primary',
  [TenderStatus.EVALUATION]: 'warning',
  [TenderStatus.COMPLETED]: 'success',
  [TenderStatus.CANCELLED]: 'error',
}

export const unitTypeLabels: Record<UnitType, string> = {
  [UnitType.PIECE]: 'Adet',
  [UnitType.BOX]: 'Kutu',
  [UnitType.KG]: 'Kilogram',
  [UnitType.LITER]: 'Litre',
  [UnitType.PACK]: 'Paket',
  [UnitType.METER]: 'Metre',
  [UnitType.PAIR]: 'Çift',
}

export const commissionRoleLabels: Record<CommissionRole, string> = {
  [CommissionRole.PRESIDENT]: 'Başkan',
  [CommissionRole.MEMBER]: 'Üye',
}

export const inspectionStatusLabels: Record<InspectionStatus, string> = {
  [InspectionStatus.ACCEPTED]: 'Kabul',
  [InspectionStatus.REJECTED]: 'Red',
}

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Yönetici',
  [UserRole.USER]: 'Kullanıcı',
  [UserRole.COMMISSIONER]: 'Komisyon Üyesi',
}
