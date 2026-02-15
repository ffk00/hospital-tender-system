package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.report.*;
import com.hospitaltender.server.service.TenderReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tenders/{tenderId}/reports")
@RequiredArgsConstructor
public class ReportController {

    private final TenderReportService tenderReportService;

    @PostMapping("/luzum-muzekkeresi")
    public ResponseEntity<byte[]> generateLuzumMuzekkeresi(
            @PathVariable Long tenderId,
            @RequestBody LuzumMuzekkeresiRequest request) {
        byte[] pdf = tenderReportService.generateLuzumMuzekkeresi(tenderId, request);
        return buildPdfResponse(pdf, "luzum-muzekkeresi.pdf");
    }

    @PostMapping("/teklif-mektubu")
    public ResponseEntity<byte[]> generateTeklifMektubu(
            @PathVariable Long tenderId,
            @RequestBody TeklifMektubuRequest request) {
        byte[] pdf = tenderReportService.generateTeklifMektubu(tenderId, request);
        return buildPdfResponse(pdf, "teklif-mektubu.pdf");
    }

    @PostMapping("/komisyon-karari")
    public ResponseEntity<byte[]> generateKomisyonKarari(
            @PathVariable Long tenderId,
            @RequestBody KomisyonKarariRequest request) {
        byte[] pdf = tenderReportService.generateKomisyonKarari(tenderId, request);
        return buildPdfResponse(pdf, "komisyon-karari.pdf");
    }

    @PostMapping("/gorevlendirme")
    public ResponseEntity<byte[]> generateGorevlendirme(
            @PathVariable Long tenderId,
            @RequestBody GorevlendirmeRequest request) {
        byte[] pdf = tenderReportService.generateGorevlendirme(tenderId, request);
        return buildPdfResponse(pdf, "gorevlendirme.pdf");
    }

    @PostMapping("/yaklasik-maliyet")
    public ResponseEntity<byte[]> generateYaklasikMaliyet(
            @PathVariable Long tenderId) {
        byte[] pdf = tenderReportService.generateYaklasikMaliyet(tenderId);
        return buildPdfResponse(pdf, "yaklasik-maliyet.pdf");
    }

    @PostMapping("/piyasa-arastirma-tutanagi")
    public ResponseEntity<byte[]> generatePiyasaArastirmaTutanagi(
            @PathVariable Long tenderId,
            @RequestBody PiyasaArastirmaTutanagiRequest request) {
        byte[] pdf = tenderReportService.generatePiyasaArastirmaTutanagi(tenderId, request);
        return buildPdfResponse(pdf, "piyasa-arastirma-tutanagi.pdf");
    }

    private ResponseEntity<byte[]> buildPdfResponse(byte[] pdf, String fileName) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"");
        headers.setContentLength(pdf.length);
        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
