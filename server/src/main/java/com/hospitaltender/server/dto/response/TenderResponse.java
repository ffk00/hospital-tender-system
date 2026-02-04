package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.TenderMethod;
import com.hospitaltender.server.enums.TenderStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class TenderResponse {

    private Long id;
    private String registrationNumber;
    private String approvalNumber;
    private String title;
    private String description;
    private TenderMethod method;
    private TenderStatus status;

    // Dates
    private LocalDate approvalDate;
    private LocalDate marketResearchDate;
    private LocalDateTime tenderDate;
    private LocalDate contractDate;
    private LocalDate contractEndDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Summary counts
    private int itemCount;
    private int commissionMemberCount;
}
