package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.Inspection;
import com.hospitaltender.server.enums.InspectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {

    List<Inspection> findByTenderId(Long tenderId);

    List<Inspection> findBySupplierId(Long supplierId);

    List<Inspection> findByStatus(InspectionStatus status);

    Optional<Inspection> findByReportNumber(String reportNumber);
}
