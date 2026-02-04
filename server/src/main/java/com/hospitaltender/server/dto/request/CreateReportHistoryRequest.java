package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.ReportType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReportHistoryRequest {

    private Long tenderId;
    private ReportType reportType;
    private String fileName;
}
