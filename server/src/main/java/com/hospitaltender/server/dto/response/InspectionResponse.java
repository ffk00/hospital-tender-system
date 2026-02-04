package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.InspectionStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class InspectionResponse {

    private Long id;
    private Long tenderId;
    private String tenderTitle;
    private Long supplierId;
    private String supplierName;
    private String reportNumber;
    private LocalDate inspectionDate;
    private String invoiceNumber;
    private String committeeReport;
    private InspectionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
