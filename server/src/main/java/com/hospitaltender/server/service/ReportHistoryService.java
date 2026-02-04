package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.response.ReportHistoryResponse;
import com.hospitaltender.server.enums.ReportType;

import java.util.List;

public interface ReportHistoryService {

    ReportHistoryResponse saveReportHistory(Long tenderId, ReportType type, String fileName);

    List<ReportHistoryResponse> getHistoryByTenderId(Long tenderId);
}
