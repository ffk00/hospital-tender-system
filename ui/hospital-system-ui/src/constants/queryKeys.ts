export const QUERY_KEYS = {
  USERS: ['users'] as const,
  USER: (id: number) => ['users', id] as const,

  SUPPLIERS: ['suppliers'] as const,
  SUPPLIER: (id: number) => ['suppliers', id] as const,

  TENDERS: ['tenders'] as const,
  TENDER: (id: number) => ['tenders', id] as const,

  TENDER_ITEMS: (tenderId: number) => ['tenders', tenderId, 'items'] as const,
  TENDER_ITEM: (id: number) => ['tender-items', id] as const,

  TENDER_COMMISSIONS: (tenderId: number) => ['tenders', tenderId, 'commissions'] as const,

  MARKET_RESEARCH_OFFERS: (tenderItemId: number) => ['tender-items', tenderItemId, 'market-research-offers'] as const,

  OFFICIAL_BIDS: (tenderItemId: number) => ['tender-items', tenderItemId, 'official-bids'] as const,

  INSPECTIONS: (tenderItemId: number) => ['tender-items', tenderItemId, 'inspections'] as const,
}
