package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateInspectionRequest;
import com.hospitaltender.server.dto.request.UpdateInspectionRequest;
import com.hospitaltender.server.dto.response.InspectionResponse;
import com.hospitaltender.server.entity.Inspection;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.Tender;
import org.springframework.stereotype.Component;

@Component
public class InspectionMapper {

    public Inspection toEntity(CreateInspectionRequest request, Tender tender, Supplier supplier) {
        Inspection inspection = new Inspection();
        inspection.setTender(tender);
        inspection.setSupplier(supplier);
        inspection.setReportNumber(request.getReportNumber());
        inspection.setInspectionDate(request.getInspectionDate());
        inspection.setInvoiceNumber(request.getInvoiceNumber());
        inspection.setCommitteeReport(request.getCommitteeReport());
        return inspection;
    }

    public void updateEntity(Inspection inspection, UpdateInspectionRequest request) {
        if (request.getReportNumber() != null) {
            inspection.setReportNumber(request.getReportNumber());
        }
        if (request.getInspectionDate() != null) {
            inspection.setInspectionDate(request.getInspectionDate());
        }
        if (request.getInvoiceNumber() != null) {
            inspection.setInvoiceNumber(request.getInvoiceNumber());
        }
        if (request.getCommitteeReport() != null) {
            inspection.setCommitteeReport(request.getCommitteeReport());
        }
        if (request.getStatus() != null) {
            inspection.setStatus(request.getStatus());
        }
    }

    public InspectionResponse toResponse(Inspection inspection) {
        return InspectionResponse.builder()
                .id(inspection.getId())
                .tenderId(inspection.getTender().getId())
                .tenderTitle(inspection.getTender().getTitle())
                .supplierId(inspection.getSupplier().getId())
                .supplierName(inspection.getSupplier().getCompanyName())
                .reportNumber(inspection.getReportNumber())
                .inspectionDate(inspection.getInspectionDate())
                .invoiceNumber(inspection.getInvoiceNumber())
                .committeeReport(inspection.getCommitteeReport())
                .status(inspection.getStatus())
                .createdAt(inspection.getCreatedAt())
                .updatedAt(inspection.getUpdatedAt())
                .build();
    }
}
