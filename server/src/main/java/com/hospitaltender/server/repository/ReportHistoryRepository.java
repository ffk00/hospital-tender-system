package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.ReportHistory;
import com.hospitaltender.server.enums.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportHistoryRepository extends JpaRepository<ReportHistory, Long> {

    List<ReportHistory> findByTenderIdOrderByCreatedAtDesc(Long tenderId);

    List<ReportHistory> findByTenderIdAndReportType(Long tenderId, ReportType reportType);

    List<ReportHistory> findByCreatedBy(Long userId);
}
