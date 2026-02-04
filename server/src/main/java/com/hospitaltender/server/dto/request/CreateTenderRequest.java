package com.hospitaltender.server.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate approvalDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate marketResearchDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime tenderDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate contractDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate contractEndDate;
}
