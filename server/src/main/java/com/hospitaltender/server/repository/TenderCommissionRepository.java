package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.TenderCommission;
import com.hospitaltender.server.enums.CommissionRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TenderCommissionRepository extends JpaRepository<TenderCommission, Long> {

    List<TenderCommission> findByTenderId(Long tenderId);

    List<TenderCommission> findByUserId(Long userId);

    Optional<TenderCommission> findByTenderIdAndRole(Long tenderId, CommissionRole role);

    boolean existsByTenderIdAndUserId(Long tenderId, Long userId);
}
