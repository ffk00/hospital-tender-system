package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.OfficialBid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OfficialBidRepository extends JpaRepository<OfficialBid, Long> {

    List<OfficialBid> findByTenderItemId(Long tenderItemId);

    List<OfficialBid> findBySupplierId(Long supplierId);

    List<OfficialBid> findByTenderItemIdAndIsValidTrue(Long tenderItemId);

    Optional<OfficialBid> findByTenderItemIdAndIsWinningBidTrue(Long tenderItemId);

    List<OfficialBid> findByTenderItemIdOrderByBidPriceAsc(Long tenderItemId);

    boolean existsByTenderItemIdAndSupplierId(Long tenderItemId, Long supplierId);
}
