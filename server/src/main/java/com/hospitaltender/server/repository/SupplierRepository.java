package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findByTaxNumber(String taxNumber);

    List<Supplier> findByCompanyNameContainingIgnoreCase(String companyName);

    List<Supplier> findByIsBlacklistedFalse();

    List<Supplier> findByIsBlacklistedTrue();

    boolean existsByTaxNumber(String taxNumber);
}
