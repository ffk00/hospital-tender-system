package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.request.UpdateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.response.MarketResearchOfferResponse;

import java.math.BigDecimal;
import java.util.List;

public interface MarketResearchOfferService {

    MarketResearchOfferResponse create(CreateMarketResearchOfferRequest request);

    MarketResearchOfferResponse getById(Long id);

    List<MarketResearchOfferResponse> getByTenderItemId(Long tenderItemId);

    MarketResearchOfferResponse update(Long id, UpdateMarketResearchOfferRequest request);

    void delete(Long id);

    /**
     * Calculates the average price of all offers for a tender item
     * and updates the tender item's approximate unit cost.
     */
    BigDecimal calculateAndUpdateApproximateCost(Long tenderItemId);
}
