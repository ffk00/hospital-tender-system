package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateOfficialBidRequest;
import com.hospitaltender.server.dto.response.OfficialBidResponse;

import java.util.List;

public interface OfficialBidService {

    OfficialBidResponse create(CreateOfficialBidRequest request);

    OfficialBidResponse getById(Long id);

    List<OfficialBidResponse> getByTenderItemId(Long tenderItemId);

    List<OfficialBidResponse> getValidBidsByTenderItemId(Long tenderItemId);

    void delete(Long id);

    /**
     * Evaluates all bids for a tender item:
     * - Rejects bids that exceed the approximate cost
     * - Selects the lowest valid bid as the winner
     */
    OfficialBidResponse evaluateBids(Long tenderItemId);

    /**
     * Manually reject a bid with a reason
     */
    OfficialBidResponse rejectBid(Long bidId, String reason);
}
