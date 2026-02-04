package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.enums.TenderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TenderRepository extends JpaRepository<Tender, Long> {

    Optional<Tender> findByRegistrationNumber(String registrationNumber);

    List<Tender> findByStatus(TenderStatus status);

    List<Tender> findByTitleContainingIgnoreCase(String title);

    boolean existsByRegistrationNumber(String registrationNumber);
}
