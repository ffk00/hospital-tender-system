package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.InspectionStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateInspectionRequest {

    private String reportNumber;
    private LocalDate inspectionDate;
    private String invoiceNumber;
    private String committeeReport;
    private InspectionStatus status;
}
