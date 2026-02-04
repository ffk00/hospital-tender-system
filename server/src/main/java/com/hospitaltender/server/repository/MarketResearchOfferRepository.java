package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.MarketResearchOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface MarketResearchOfferRepository extends JpaRepository<MarketResearchOffer, Long> {

    List<MarketResearchOffer> findByTenderItemId(Long tenderItemId);

    List<MarketResearchOffer> findBySupplierId(Long supplierId);

    @Query("SELECT AVG(m.offeredPrice) FROM MarketResearchOffer m WHERE m.tenderItem.id = :tenderItemId")
    BigDecimal calculateAveragePrice(@Param("tenderItemId") Long tenderItemId);

    long countByTenderItemId(Long tenderItemId);
}
