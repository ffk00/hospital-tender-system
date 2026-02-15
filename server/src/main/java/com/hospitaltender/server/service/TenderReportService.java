package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.report.*;

public interface TenderReportService {

    byte[] generateLuzumMuzekkeresi(Long tenderId, LuzumMuzekkeresiRequest request);

    byte[] generateTeklifMektubu(Long tenderId, TeklifMektubuRequest request);

    byte[] generateKomisyonKarari(Long tenderId, KomisyonKarariRequest request);

    byte[] generateGorevlendirme(Long tenderId, GorevlendirmeRequest request);

    byte[] generateYaklasikMaliyet(Long tenderId);

    byte[] generatePiyasaArastirmaTutanagi(Long tenderId, PiyasaArastirmaTutanagiRequest request);
}
