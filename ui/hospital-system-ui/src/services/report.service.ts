import api from './api'

export const reportService = {
  generateLuzumMuzekkeresi: (tenderId: number, data: Record<string, unknown>) =>
    api.post(`/tenders/${tenderId}/reports/luzum-muzekkeresi`, data, { responseType: 'blob' }).then((res) => res.data as Blob),

  generateTeklifMektubu: (tenderId: number, data: Record<string, unknown>) =>
    api.post(`/tenders/${tenderId}/reports/teklif-mektubu`, data, { responseType: 'blob' }).then((res) => res.data as Blob),

  generateKomisyonKarari: (tenderId: number, data: Record<string, unknown>) =>
    api.post(`/tenders/${tenderId}/reports/komisyon-karari`, data, { responseType: 'blob' }).then((res) => res.data as Blob),

  generateGorevlendirme: (tenderId: number, data: Record<string, unknown>) =>
    api.post(`/tenders/${tenderId}/reports/gorevlendirme`, data, { responseType: 'blob' }).then((res) => res.data as Blob),

  generateYaklasikMaliyet: (tenderId: number) =>
    api.post(`/tenders/${tenderId}/reports/yaklasik-maliyet`, {}, { responseType: 'blob' }).then((res) => res.data as Blob),

  generatePiyasaArastirmaTutanagi: (tenderId: number, data: Record<string, unknown>) =>
    api.post(`/tenders/${tenderId}/reports/piyasa-arastirma-tutanagi`, data, { responseType: 'blob' }).then((res) => res.data as Blob),
}
