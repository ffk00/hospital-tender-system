package com.hospitaltender.server.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateInspectionRequest {

    private Long tenderId;
    private Long supplierId;
    private String reportNumber;
    private LocalDate inspectionDate;
    private String invoiceNumber;
    private String committeeReport;
}
