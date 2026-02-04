package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.TenderMethod;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateTenderRequest {

    private String registrationNumber;
    private String approvalNumber;
    private String title;
    private String description;
    private TenderMethod method;

    // Dates
    private LocalDate approvalDate;
    private LocalDate marketResearchDate;
    private LocalDateTime tenderDate;
    private LocalDate contractDate;
    private LocalDate contractEndDate;
}
