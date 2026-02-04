package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.response.ReportHistoryResponse;
import com.hospitaltender.server.entity.ReportHistory;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.enums.ReportType;
import com.hospitaltender.server.exception.ResourceNotFoundException;
import com.hospitaltender.server.repository.ReportHistoryRepository;
import com.hospitaltender.server.repository.TenderRepository;
import com.hospitaltender.server.service.ReportHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportHistoryServiceImpl implements ReportHistoryService {

    private final ReportHistoryRepository reportHistoryRepository;
    private final TenderRepository tenderRepository;

    @Override
    public ReportHistoryResponse saveReportHistory(Long tenderId, ReportType type, String fileName) {
        Tender tender = tenderRepository.findById(tenderId)
                .orElseThrow(() -> new ResourceNotFoundException("Tender", tenderId));

        ReportHistory reportHistory = new ReportHistory();
        reportHistory.setTender(tender);
        reportHistory.setReportType(type);
        reportHistory.setFileName(fileName);

        ReportHistory savedHistory = reportHistoryRepository.save(reportHistory);
        return toResponse(savedHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportHistoryResponse> getHistoryByTenderId(Long tenderId) {
        if (!tenderRepository.existsById(tenderId)) {
            throw new ResourceNotFoundException("Tender", tenderId);
        }

        return reportHistoryRepository.findByTenderIdOrderByCreatedAtDesc(tenderId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ReportHistoryResponse toResponse(ReportHistory reportHistory) {
        return ReportHistoryResponse.builder()
                .id(reportHistory.getId())
                .tenderId(reportHistory.getTender().getId())
                .reportType(reportHistory.getReportType())
                .fileName(reportHistory.getFileName())
                .createdBy(reportHistory.getCreatedBy())
                .createdAt(reportHistory.getCreatedAt())
                .build();
    }
}
