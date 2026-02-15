package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.report.*;
import com.hospitaltender.server.entity.*;
import com.hospitaltender.server.enums.ReportType;
import com.hospitaltender.server.exception.ResourceNotFoundException;
import com.hospitaltender.server.repository.*;
import com.hospitaltender.server.service.JasperReportService;
import com.hospitaltender.server.service.ReportHistoryService;
import com.hospitaltender.server.service.TenderReportService;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TenderReportServiceImpl implements TenderReportService {

    private final TenderRepository tenderRepository;
    private final TenderItemRepository tenderItemRepository;
    private final TenderCommissionRepository tenderCommissionRepository;
    private final MarketResearchOfferRepository marketResearchOfferRepository;
    private final SupplierRepository supplierRepository;
    private final JasperReportService jasperReportService;
    private final ReportHistoryService reportHistoryService;

    @Override
    @Transactional
    public byte[] generateLuzumMuzekkeresi(Long tenderId, LuzumMuzekkeresiRequest request) {
        Tender tender = getTender(tenderId);
        List<TenderItem> items = tenderItemRepository.findByTenderId(tenderId);

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("documentNumber", request.getDocumentNumber());
        params.put("documentDate", request.getDocumentDate());
        params.put("requestSubject", request.getRequestSubject());
        params.put("serviceManager1", request.getServiceManager1());
        params.put("serviceManager2", request.getServiceManager2());
        params.put("pharmacistName", request.getPharmacistName());
        params.put("warehouseManagerName", request.getWarehouseManagerName());
        params.put("adminManagerName", request.getAdminManagerName());
        params.put("chiefPhysicianName", request.getChiefPhysicianName());

        List<Map<String, Object>> dataRows = items.stream().map(item -> {
            Map<String, Object> row = new HashMap<>();
            row.put("itemName", item.getItemName());
            row.put("specifications", item.getSpecifications());
            row.put("quantity", item.getQuantity());
            row.put("unit", item.getUnit().name());
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("luzum-muzekkeresi", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.LUZUM_MUZEKKERESI, "luzum-muzekkeresi.pdf");
        return pdf;
    }

    @Override
    @Transactional
    public byte[] generateTeklifMektubu(Long tenderId, TeklifMektubuRequest request) {
        Tender tender = getTender(tenderId);
        List<TenderItem> items = tenderItemRepository.findByTenderId(tenderId);
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", request.getSupplierId()));

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("documentNumber", request.getDocumentNumber());
        params.put("supplierName", supplier.getCompanyName());
        params.put("supplierAddress", supplier.getAddress());
        params.put("supplierTaxNumber", supplier.getTaxNumber());
        params.put("supplierTaxOffice", supplier.getTaxOffice());
        params.put("chiefPhysicianName", request.getChiefPhysicianName());

        List<Map<String, Object>> dataRows = items.stream().map(item -> {
            Map<String, Object> row = new HashMap<>();
            row.put("itemName", item.getItemName());
            row.put("specifications", item.getSpecifications());
            row.put("quantity", item.getQuantity());
            row.put("unit", item.getUnit().name());
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("teklif-mektubu", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.TEKLIF_MEKTUBU, "teklif-mektubu.pdf");
        return pdf;
    }

    @Override
    @Transactional
    public byte[] generateKomisyonKarari(Long tenderId, KomisyonKarariRequest request) {
        Tender tender = getTender(tenderId);
        List<TenderCommission> members = tenderCommissionRepository.findByTenderId(tenderId);
        List<TenderItem> items = tenderItemRepository.findByTenderId(tenderId);

        String itemNames = items.stream()
                .map(TenderItem::getItemName)
                .collect(Collectors.joining(", "));

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("decisionNumber", request.getDecisionNumber());
        params.put("decisionDate", request.getDecisionDate());
        params.put("hospitalName", request.getHospitalName());
        params.put("purposeText", request.getPurposeText());
        params.put("itemNames", itemNames);

        List<Map<String, Object>> dataRows = members.stream().map(member -> {
            Map<String, Object> row = new HashMap<>();
            row.put("memberName", member.getUser().getFirstName() + " " + member.getUser().getLastName());
            row.put("memberTitle", member.getUser().getTitle());
            row.put("memberRole", member.getRole().name());
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("komisyon-karari", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.KOMISYON_KARARI, "komisyon-karari.pdf");
        return pdf;
    }

    @Override
    @Transactional
    public byte[] generateGorevlendirme(Long tenderId, GorevlendirmeRequest request) {
        Tender tender = getTender(tenderId);
        List<TenderCommission> members = tenderCommissionRepository.findByTenderId(tenderId);

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("documentNumber", request.getDocumentNumber());
        params.put("documentDate", request.getDocumentDate());
        params.put("purposeText", request.getPurposeText());
        params.put("chiefPhysicianName", request.getChiefPhysicianName());
        params.put("adminManagerName", request.getAdminManagerName());

        List<Map<String, Object>> dataRows = members.stream().map(member -> {
            Map<String, Object> row = new HashMap<>();
            row.put("memberName", member.getUser().getFirstName() + " " + member.getUser().getLastName());
            row.put("memberTitle", member.getUser().getTitle());
            row.put("memberRole", member.getRole().name());
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("gorevlendirme", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.GOREVLENDIRME, "gorevlendirme.pdf");
        return pdf;
    }

    @Override
    @Transactional
    public byte[] generateYaklasikMaliyet(Long tenderId) {
        Tender tender = getTender(tenderId);
        List<TenderItem> items = tenderItemRepository.findByTenderId(tenderId);

        // Collect all unique suppliers across all items
        Set<String> supplierNames = new LinkedHashSet<>();
        Map<Long, List<MarketResearchOffer>> offersByItem = new HashMap<>();

        for (TenderItem item : items) {
            List<MarketResearchOffer> offers = marketResearchOfferRepository.findByTenderItemId(item.getId());
            offersByItem.put(item.getId(), offers);
            offers.forEach(o -> supplierNames.add(o.getSupplier().getCompanyName()));
        }

        List<String> supplierList = new ArrayList<>(supplierNames);

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("legalReference", "4734 Sayılı Kamu İhale Kanunu");
        for (int i = 0; i < supplierList.size() && i < 5; i++) {
            params.put("supplier" + (i + 1) + "Name", supplierList.get(i));
        }

        // Flatten data: each row = one item with all supplier prices
        List<Map<String, Object>> dataRows = items.stream().map(item -> {
            Map<String, Object> row = new HashMap<>();
            row.put("itemName", item.getItemName());
            row.put("quantity", item.getQuantity());
            row.put("unit", item.getUnit().name());

            List<MarketResearchOffer> offers = offersByItem.getOrDefault(item.getId(), List.of());
            BigDecimal totalPrice = BigDecimal.ZERO;
            int priceCount = 0;

            for (int i = 0; i < supplierList.size() && i < 5; i++) {
                String supplierName = supplierList.get(i);
                BigDecimal price = offers.stream()
                        .filter(o -> o.getSupplier().getCompanyName().equals(supplierName))
                        .map(MarketResearchOffer::getOfferedPrice)
                        .findFirst()
                        .orElse(null);
                row.put("price" + (i + 1), price);
                if (price != null) {
                    totalPrice = totalPrice.add(price);
                    priceCount++;
                }
            }

            BigDecimal avgPrice = priceCount > 0
                    ? totalPrice.divide(BigDecimal.valueOf(priceCount), 2, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
            row.put("avgPrice", avgPrice);
            row.put("totalCost", avgPrice.multiply(item.getQuantity()).setScale(2, RoundingMode.HALF_UP));
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("yaklasik-maliyet", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.YAKLASIK_MALIYET_CETVELI, "yaklasik-maliyet.pdf");
        return pdf;
    }

    @Override
    @Transactional
    public byte[] generatePiyasaArastirmaTutanagi(Long tenderId, PiyasaArastirmaTutanagiRequest request) {
        Tender tender = getTender(tenderId);
        List<TenderItem> items = tenderItemRepository.findByTenderId(tenderId);

        // Collect all unique suppliers across all items
        Set<String> supplierNames = new LinkedHashSet<>();
        Map<Long, List<MarketResearchOffer>> offersByItem = new HashMap<>();

        for (TenderItem item : items) {
            List<MarketResearchOffer> offers = marketResearchOfferRepository.findByTenderItemId(item.getId());
            offersByItem.put(item.getId(), offers);
            offers.forEach(o -> supplierNames.add(o.getSupplier().getCompanyName()));
        }

        List<String> supplierList = new ArrayList<>(supplierNames);

        Map<String, Object> params = new HashMap<>();
        params.put("tenderTitle", tender.getTitle());
        params.put("reportNumber", request.getReportNumber());
        params.put("reportDate", request.getReportDate());
        for (int i = 0; i < supplierList.size() && i < 5; i++) {
            params.put("supplier" + (i + 1) + "Name", supplierList.get(i));
        }

        List<Map<String, Object>> dataRows = items.stream().map(item -> {
            Map<String, Object> row = new HashMap<>();
            row.put("itemName", item.getItemName());
            row.put("quantity", item.getQuantity());
            row.put("unit", item.getUnit().name());

            List<MarketResearchOffer> offers = offersByItem.getOrDefault(item.getId(), List.of());
            BigDecimal totalAmount = BigDecimal.ZERO;
            int offerCount = 0;

            for (int i = 0; i < supplierList.size() && i < 5; i++) {
                String supplierName = supplierList.get(i);
                BigDecimal price = offers.stream()
                        .filter(o -> o.getSupplier().getCompanyName().equals(supplierName))
                        .map(MarketResearchOffer::getOfferedPrice)
                        .findFirst()
                        .orElse(null);
                row.put("price" + (i + 1), price);
                if (price != null) {
                    totalAmount = totalAmount.add(price.multiply(item.getQuantity()));
                    offerCount++;
                }
            }

            row.put("totalAmount", offerCount > 0
                    ? totalAmount.divide(BigDecimal.valueOf(offerCount), 2, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO);
            return row;
        }).collect(Collectors.toList());

        JRDataSource dataSource = new JRBeanCollectionDataSource(dataRows);
        byte[] pdf = jasperReportService.generateReport("piyasa-arastirma-tutanagi", params, dataSource);

        reportHistoryService.saveReportHistory(tenderId, ReportType.PIYASA_ARASTIRMA_TUTANAGI, "piyasa-arastirma-tutanagi.pdf");
        return pdf;
    }

    private Tender getTender(Long tenderId) {
        return tenderRepository.findById(tenderId)
                .orElseThrow(() -> new ResourceNotFoundException("Tender", tenderId));
    }
}
