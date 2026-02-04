package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.ReportType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReportHistoryResponse {

    private Long id;
    private Long tenderId;
    private ReportType reportType;
    private String fileName;
    private Long createdBy;
    private LocalDateTime createdAt;
}
